import {
  SOCRATA_BASE_URL,
  SOCRATA_RESOURCE_ID,
  SNIES_PAGE_LIMIT,
  SNIES_SELECT_COLS,
} from "@/constants/socrata";
import type { Prisma } from "@prisma/client";

export type RawSniesRow = Record<string, string | number | null>;

/**
 * Elimina acentos y convierte a mayusculas para normalizar texto antes de
 * almacenarlo o compararlo. Garantiza que busquedas con `ILIKE` funcionen
 * independientemente de si el texto fuente tiene o no acentos.
 */
export function stripAccents(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toUpperCase()
    .trim();
}

// Sector (id_sector): 1 = Oficial, 2 = Privada
const SECTOR_LABEL: Record<number, string> = {
  1: "Oficial",
  2: "Privada",
};

// Metodologia (id_metodologia): 1 = Presencial, 2 = A Distancia, 3 = Virtual
const METODOLOGIA_LABEL: Record<number, string> = {
  1: "Presencial",
  2: "A Distancia",
  3: "Virtual",
};

/**
 * Obtiene una pagina de programas SNIES desde la API de datos.gov.co.
 * Usa $select + $group para deduplicar en la API, excluyendo las columnas
 * id_genero, anio, semestre y matriculados antes de traer los datos.
 * Esto reduce ~390 k registros a ~16 k programas unicos por request.
 */
export async function fetchSniesPage(offset: number): Promise<RawSniesRow[]> {
  const url = new URL(`${SOCRATA_BASE_URL}/${SOCRATA_RESOURCE_ID}.json`);
  url.searchParams.set("$select", SNIES_SELECT_COLS);
  url.searchParams.set("$group",  SNIES_SELECT_COLS);
  url.searchParams.set("$limit",  String(SNIES_PAGE_LIMIT));
  url.searchParams.set("$offset", String(offset));

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`SNIES API error: ${res.status}`);
  return res.json() as Promise<RawSniesRow[]>;
}

function toInt(v: string | number | null | undefined): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return isNaN(n) ? null : Math.round(n);
}

function toStr(v: string | number | null | undefined): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

/** Igual que toStr pero aplica stripAccents al resultado (para campos de busqueda). */
function toStrNorm(v: string | number | null | undefined): string | null {
  const s = toStr(v);
  return s !== null ? stripAccents(s) : null;
}

/**
 * Convierte un string a Title Case preservando acentos.
 * Normaliza los nombres de departamento/municipio que el dataset devuelve
 * en mayusculas ("ANTIOQUIA") o title case ("Antioquia") de forma inconsistente.
 */
function toTitleCase(v: string | number | null | undefined): string | null {
  const s = toStr(v);
  if (s === null) return null;
  return s
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
}

/**
 * Convierte un codigo DANE a string con ceros a la izquierda.
 * Los codigos de municipio son siempre 5 digitos (ej. "5001" -> "05001").
 * Los codigos de departamento son siempre 2 digitos (ej. "5" -> "05").
 */
function toDaneCode(v: string | number | null | undefined, digits: number): string | null {
  const s = toStr(v);
  if (s === null) return null;
  return s.padStart(digits, "0");
}

export function normalizeSniesRow(
  row: RawSniesRow,
): Prisma.SniesProgramUncheckedCreateInput {
  const idsector    = toInt(row["id_sector"]);
  const codigometod = toInt(row["id_metodologia"]);

  return {
    codigoprograma:             toStr(row["c_digo_snies_delprograma"]),
    codigoinstitucion:          toInt(row["c_digo_de_la_instituci_n"]),
    iespadre:                   toStr(row["ies_padre"]),
    // Title case para nombre de institucion (datos inconsistentes en el dataset)
    nombreinstitucion:          toTitleCase(row["instituci_n_de_educaci_n_superior_ies"]),
    principaloseccional:        toStr(row["principal_oseccional"]),
    idsector,
    idcaracter:                 toInt(row["id_caracter"]),
    codigodepartinstitucion:    toInt(row["c_digo_del_departamento_ies"]),
    // Title case para evitar duplicados "ANTIOQUIA" / "Antioquia" en filtros
    nombredepartinstitucion:    toTitleCase(row["departamento_de_domicilio_de_la_ies"]),
    // Codigo de municipio IES con cero a la izquierda (DANE: 5 digitos)
    codigomunicipioinstitucion: toDaneCode(row["c_digo_del_municipio_ies"], 5),
    nombremunicipioinstitucion: toTitleCase(row["municipio_dedomicilio_de_la_ies"]),
    // Normalizado sin acentos y mayusculas para busqueda ILIKE
    nombreprograma:             toStrNorm(row["programa_acad_mico"]),
    idnivel:                    toInt(row["id_nivel"]),
    idnivelformacion:           toInt(row["id_nivel_formacion"]),
    codigometodologia:          codigometod,
    nombremetodologia:          codigometod !== null ? (METODOLOGIA_LABEL[codigometod] ?? null) : null,
    nombrecaracteracademico:    idsector    !== null ? (SECTOR_LABEL[idsector]         ?? null) : null,
    idarea:                     toInt(row["id_area"]),
    idnucleo:                   toInt(row["id_nucleo"]),
    nombrenbc:                  toStr(row["n_cleo_b_sico_del_conocimiento_nbc"]),
    // Codigo de departamento del programa con cero a la izquierda (DANE: 2 digitos)
    codigodepartprograma:       toDaneCode(row["c_digo_del_departamento_programa"], 2),
    // Title case para evitar duplicados en el filtro de departamentos
    nombredepartprograma:       toTitleCase(row["departamento_de_oferta_del_programa"]),
    // Codigo de municipio con cero a la izquierda (DANE: 5 digitos) para join con Location
    codigomunicipioprograma:    toDaneCode(row["c_digo_del_municipio_programa"], 5),
    nombremunicipioprograma:    toTitleCase(row["municipio_de_oferta_del_programa"]),
  };
}
