export const SOCRATA_BASE_URL        = "https://www.datos.gov.co/resource";
export const SOCRATA_RESOURCE_ID     = "5wck-szir";
export const SOCRATA_QUERY_LIMIT     = 500;
export const OFFERING_CACHE_TTL_DAYS = 30;

export const SOCRATA_FIELD_PROGRAM        = "programa_acad_mico";
export const SOCRATA_FIELD_INSTITUTION    = "instituci_n_de_educaci_n_superior_ies";
export const SOCRATA_FIELD_CHARACTER_ID   = "id_caracter";
export const SOCRATA_FIELD_METHODOLOGY_ID = "id_metodologia";
export const SOCRATA_FIELD_MUNICIPALITY   = "municipio_de_oferta_del_programa";
export const SOCRATA_FIELD_DEPARTMENT     = "departamento_de_oferta_del_programa";
export const SOCRATA_FIELD_ACADEMIC_LEVEL = "nivel_acad_mico";

export const CHARACTER_MAP: Record<string, string> = {
  "1": "Oficial",
  "2": "Privada",
};

export const METHODOLOGY_MAP: Record<string, string> = {
  "1": "Presencial",
  "2": "A Distancia",
  "3": "Virtual",
};

export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";
export const NOMINATIM_DELAY_MS = 200;
