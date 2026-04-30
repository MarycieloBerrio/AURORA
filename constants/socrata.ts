export const SOCRATA_BASE_URL  = "https://www.datos.gov.co/resource";
export const SOCRATA_RESOURCE_ID = "5wck-szir";
export const SNIES_PAGE_LIMIT  = 1000;
export const SNIES_MAX_RECORDS = 50_000; // dataset deduplicado ~16 k programas unicos

// Columnas que se seleccionan Y agrupan en la API para obtener
// registros unicos (DISTINCT) sin los campos excluidos:
// id_g_nero, a_o, semestre, matriculados_*
export const SNIES_SELECT_COLS = [
  "c_digo_snies_delprograma",
  "programa_acad_mico",
  "c_digo_de_la_instituci_n",
  "ies_padre",
  "instituci_n_de_educaci_n_superior_ies",
  "principal_oseccional",
  "id_sector",
  "id_caracter",
  "c_digo_del_departamento_ies",
  "departamento_de_domicilio_de_la_ies",
  "c_digo_del_municipio_ies",
  "municipio_dedomicilio_de_la_ies",
  "id_nivel",
  "id_nivel_formacion",
  "id_metodologia",
  "id_area",
  "id_nucleo",
  "n_cleo_b_sico_del_conocimiento_nbc",
  "c_digo_del_departamento_programa",
  "departamento_de_oferta_del_programa",
  "c_digo_del_municipio_programa",
  "municipio_de_oferta_del_programa",
].join(",");

export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";
export const NOMINATIM_DELAY_MS = 250;
