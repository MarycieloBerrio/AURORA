import {
  SOCRATA_BASE_URL,
  SOCRATA_RESOURCE_ID,
  SNIES_PAGE_LIMIT,
  SNIES_FIELD_ESTADO,
} from "@/constants/socrata";
import type { Prisma } from "@prisma/client";

export type RawSniesRow = Record<string, string | number | null>;

/**
 * Elimina acentos y convierte a mayúsculas para normalizar texto antes de
 * almacenarlo o compararlo. Garantiza que búsquedas con `ILIKE` funcionen
 * independientemente de si el texto fuente tiene o no acentos.
 */
export function stripAccents(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toUpperCase()
    .trim();
}

export async function fetchSniesPage(offset: number): Promise<RawSniesRow[]> {
  const url = new URL(`${SOCRATA_BASE_URL}/${SOCRATA_RESOURCE_ID}.json`);
  url.searchParams.set("$limit", String(SNIES_PAGE_LIMIT));
  url.searchParams.set("$offset", String(offset));
  url.searchParams.set("$where", `${SNIES_FIELD_ESTADO} = 1`); // 1 = Activo

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

/** Igual que toStr pero aplica stripAccents al resultado (para campos de búsqueda). */
function toStrNorm(v: string | number | null | undefined): string | null {
  const s = toStr(v);
  return s !== null ? stripAccents(s) : null;
}

export function normalizeSniesRow(
  row: RawSniesRow,
): Prisma.SniesProgramUncheckedCreateInput {
  return {
    codigoprograma:               toStr(row["codigoprograma"]) ?? "",
    codigoinstitucion:            toInt(row["codigoinstitucion"]),
    nombreinstitucion:            toStr(row["nombreinstitucion"]),
    codigodepartinstitucion:      toInt(row["codigodepartinstitucion"]),
    nombredepartinstitucion:      toStr(row["nombredepartinstitucion"]),
    codigomunicipioinstitucion:   toInt(row["codigomunicipioinstitucion"]),
    nombremunicipioinstitucion:   toStr(row["nombremunicipioinstitucion"]),
    codigoorigeninstitucional:    toInt(row["codigoorigeninstitucional"]),
    nombreorigeninstitucional:    toStr(row["nombreorigeninstitucional"]),
    codigocaracteracademico:      toInt(row["codigocaracteracademico"]),
    nombrecaracteracademico:      toStr(row["nombrecaracteracademico"]),
    // Normalizado (sin acentos, mayúsculas) para que la búsqueda ILIKE funcione
    // independientemente de cómo viene el dato desde la API del SNIES.
    nombreprograma:               toStrNorm(row["nombreprograma"]),
    codigodepartprograma:         toStr(row["codigodepartprograma"]),
    nombredepartprograma:         toStr(row["nombredepartprograma"]),
    codigomunicipioprograma:      toStr(row["codigomunicipioprograma"]),
    nombremunicipioprograma:      toStr(row["nombremunicipioprograma"]),
    codigoestadoprograma:         toInt(row["codigoestadoprograma"]),
    nombreestadoprograma:         toStr(row["nombreestadoprograma"]),
    cantidadcreditos:             toStr(row["cantidadcreditos"]),
    fechaacreditacion:            toStr(row["fechaacreditacion"]),
    codigoareaconocimiento:       toStr(row["codigoareaconocimiento"]),
    nombreareaconocimiento:       toStr(row["nombreareaconocimiento"]),
    codigometodologia:            toInt(row["codigometodologia"]),
    nombremetodologia:            toStr(row["nombremetodologia"]),
    codigonbc:                    toStr(row["codigonbc"]),
    nombrenbc:                    toStr(row["nombrenbc"]),
    codigonivelformacion:         toInt(row["codigonivelformacion"]),
    nombrenivelformacion:         toStr(row["nombrenivelformacion"]),
    codigonivelacademico:         toInt(row["codigonivelacademico"]),
    nombrenivelacademico:         toStr(row["nombrenivelacademico"]),
    codigoperiodicidad:           toInt(row["codigoperiodicidad"]),
    nombreperiodicidad:           toStr(row["nombreperiodicidad"]),
    cantidadperiodos:             toStr(row["cantidadperiodos"]),
    numeroresolucionacreditacion: toStr(row["numeroresolucionacreditacion"]),
    codigotipoacreditacion:       toInt(row["codigotipoacreditacion"]),
    nombretipoacreditacion:       toStr(row["nombretipoacreditacion"]),
    aniosacreditados:             toStr(row["aniosacreditados"]),
    nombretituloobtenido:         toStr(row["nombretituloobtenido"]),
    fechacreacion:                toStr(row["fechacreacion"]),
  };
}
