import {
  SOCRATA_BASE_URL,
  SOCRATA_RESOURCE_ID,
  SOCRATA_QUERY_LIMIT,
  SOCRATA_FIELD_INSTITUTION,
  SOCRATA_FIELD_CHARACTER_ID,
  SOCRATA_FIELD_METHODOLOGY_ID,
  SOCRATA_FIELD_MUNICIPALITY,
  SOCRATA_FIELD_DEPARTMENT,
  SOCRATA_FIELD_ACADEMIC_LEVEL,
  CHARACTER_MAP,
  METHODOLOGY_MAP,
} from "@/constants/socrata";

export interface SocrataOffering {
  programKey: string;
  institutionName: string;
  municipality: string;
  department: string;
  character: string;
  methodology: string;
  academicLevel: string;
}

export function normalizeProgram(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

export async function fetchProgramOfferings(
  programTitle: string,
): Promise<SocrataOffering[]> {
  const programKey = normalizeProgram(programTitle);
  const url = new URL(`${SOCRATA_BASE_URL}/${SOCRATA_RESOURCE_ID}.json`);
  url.searchParams.set("$q", programKey);
  url.searchParams.set("$limit", String(SOCRATA_QUERY_LIMIT));

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Socrata API responded with status ${response.status}`);
  }

  const raw: Record<string, string>[] = await response.json();

  return raw.map((row) => ({
    programKey,
    institutionName: row[SOCRATA_FIELD_INSTITUTION]    ?? "",
    municipality:    row[SOCRATA_FIELD_MUNICIPALITY]   ?? "",
    department:      row[SOCRATA_FIELD_DEPARTMENT]     ?? "",
    character:       CHARACTER_MAP[row[SOCRATA_FIELD_CHARACTER_ID]]   ?? "Desconocido",
    methodology:     METHODOLOGY_MAP[row[SOCRATA_FIELD_METHODOLOGY_ID]] ?? "Desconocido",
    academicLevel:   row[SOCRATA_FIELD_ACADEMIC_LEVEL] ?? "",
  }));
}
