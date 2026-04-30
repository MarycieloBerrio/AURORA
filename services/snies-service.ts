import { prisma } from "@/lib/prisma";
import { fetchSniesPage, normalizeSniesRow, stripAccents } from "@/lib/socrata-client";
import { SNIES_MAX_RECORDS, SNIES_PAGE_LIMIT } from "@/constants/socrata";
import type { SniesProgram } from "@prisma/client";

export interface EnrichedSniesProgram extends SniesProgram {
  lat: number | null;
  lng: number | null;
}

// Palabras vacías comunes en nombres de programas universitarios
const STOP_WORDS = new Set([
  "de", "del", "la", "el", "los", "las", "en", "y", "e", "con",
  "para", "a", "o", "u", "i", "al", "lo", "un", "una", "por",
  "sin", "sobre", "entre",
]);

/**
 * Extrae palabras clave significativas del nombre de la carrera.
 * Elimina stop words y tokens muy cortos para hacer AND-match contra
 * variantes del nombre en SNIES.
 *
 * "Ingeniería en sistemas" → ["Ingenieria", "sistemas"]
 * Coincide con "INGENIERIA DE SISTEMAS", "INGENIERIA EN SISTEMAS Y COMPUTACION", etc.
 *
 * Cada keyword sale también sin acentos (stripAccents) para que el ILIKE
 * funcione tanto si la BD almacena con acentos como sin ellos.
 */
function extractKeywords(name: string): string[] {
  return name
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()))
    .map(stripAccents); // normalizar: quitar acentos + mayúsculas
}

export const sniesService = {
  async refresh(): Promise<{ inserted: number }> {
    await prisma.sniesProgram.deleteMany();

    let offset   = 0;
    let fetched  = 0; // filas que devolvió la API (controla el loop y el offset)
    let inserted = 0; // filas guardadas efectivamente en BD

    while (fetched < SNIES_MAX_RECORDS) {
      const page = await fetchSniesPage(offset);
      if (page.length === 0) break;

      // Solo descartamos filas que no tengan nombre de programa (datos inutilizables).
      // codigoprograma ya no es PK: no filtramos por el ni usamos skipDuplicates.
      const data = page
        .map(normalizeSniesRow)
        .filter((r) => r.nombreprograma);

      if (data.length > 0) {
        await prisma.sniesProgram.createMany({ data });
        inserted += data.length;
      }

      // El offset avanza según lo que devolvió la API, no según lo que
      // sobrevivió el filtro local (evita saltarse filas entre páginas).
      fetched += page.length;
      offset  += SNIES_PAGE_LIMIT;

      if (page.length < SNIES_PAGE_LIMIT) break; // última página
    }

    return { inserted };
  },

  async searchByName(programName: string): Promise<EnrichedSniesProgram[]> {
    const keywords = extractKeywords(programName);

    // AND-match: cada palabra clave significativa debe aparecer en nombreprograma.
    // Como los keywords ya vienen normalizados (sin acentos, mayúsculas) por
    // extractKeywords/stripAccents, el ILIKE funciona independientemente de si
    // la BD almacena "INGENIERIA" o "INGENIERÍA".
    // Si no se extrajeron keywords, se hace contains sobre el nombre normalizado.
    const whereClause =
      keywords.length > 0
        ? {
            AND: keywords.map((kw) => ({
              nombreprograma: { contains: kw, mode: "insensitive" as const },
            })),
          }
        : { nombreprograma: { contains: stripAccents(programName), mode: "insensitive" as const } };

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
