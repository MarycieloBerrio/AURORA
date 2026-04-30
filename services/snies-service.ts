import { prisma } from "@/lib/prisma";
import { fetchSniesPage, normalizeSniesRow } from "@/lib/socrata-client";
import { SNIES_MAX_RECORDS, SNIES_PAGE_LIMIT } from "@/constants/socrata";
import type { SniesProgram } from "@prisma/client";

export interface EnrichedSniesProgram extends SniesProgram {
  lat: number | null;
  lng: number | null;
}

// Spanish stop words common in university program names
const STOP_WORDS = new Set([
  "de", "del", "la", "el", "los", "las", "en", "y", "e", "con",
  "para", "a", "o", "u", "i", "al", "lo", "un", "una", "por",
  "sin", "sobre", "entre",
]);

/**
 * Extract meaningful search keywords from a career/program name.
 * Removes stop words and very short tokens so we can do AND-match
 * across related program variants.
 *
 * "Ingeniería en sistemas" → ["Ingeniería", "sistemas"]
 * Matches "INGENIERÍA DE SISTEMAS", "INGENIERÍA EN SISTEMAS Y COMPUTACIÓN", etc.
 */
function extractKeywords(name: string): string[] {
  return name
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()));
}

export const sniesService = {
  async refresh(): Promise<{ inserted: number }> {
    await prisma.sniesProgram.deleteMany();

    let offset = 0;
    let total = 0;

    while (total < SNIES_MAX_RECORDS) {
      const page = await fetchSniesPage(offset);
      if (page.length === 0) break;

      const data = page
        .map(normalizeSniesRow)
        .filter((r) => r.codigoprograma && r.codigoprograma !== "");

      if (data.length > 0) {
        await prisma.sniesProgram.createMany({ data, skipDuplicates: true });
      }

      total += data.length;
      offset += SNIES_PAGE_LIMIT;

      if (page.length < SNIES_PAGE_LIMIT) break;
    }

    return { inserted: total };
  },

  async searchByName(programName: string): Promise<EnrichedSniesProgram[]> {
    const keywords = extractKeywords(programName);

    // If no meaningful keywords, fall back to simple contains
    const whereClause =
      keywords.length > 0
        ? {
            AND: keywords.map((kw) => ({
              nombreprograma: { contains: kw, mode: "insensitive" as const },
            })),
          }
        : { nombreprograma: { contains: programName, mode: "insensitive" as const } };

    const programs = await prisma.sniesProgram.findMany({
      where: whereClause,
      take: 200,
      orderBy: [{ nombredepartprograma: "asc" }, { nombreinstitucion: "asc" }],
    });

    if (programs.length === 0) return [];

    const codes = [
      ...new Set(
        programs
          .map((p) => p.codigomunicipioprograma)
          .filter((c): c is string => c !== null),
      ),
    ];

    const locations = await prisma.location.findMany({
      where: { codeLocation: { in: codes } },
    });

    const locMap = Object.fromEntries(locations.map((l) => [l.codeLocation, l]));

    return programs.map((p) => ({
      ...p,
      lat: locMap[p.codigomunicipioprograma ?? ""]?.lat ?? null,
      lng: locMap[p.codigomunicipioprograma ?? ""]?.lng ?? null,
    }));
  },
};
