import { prisma } from "@/lib/prisma";
import { fetchSniesPage, normalizeSniesRow } from "@/lib/socrata-client";
import { SNIES_MAX_RECORDS, SNIES_PAGE_LIMIT } from "@/constants/socrata";
import type { SniesProgram } from "@prisma/client";

export interface EnrichedSniesProgram extends SniesProgram {
  lat: number | null;
  lng: number | null;
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
    const programs = await prisma.sniesProgram.findMany({
      where: {
        nombreprograma: { contains: programName, mode: "insensitive" },
      },
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
