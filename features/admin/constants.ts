export const ADMIN_TEST_TOTALS = {
  riasec: 4,
  hexaco: 3,
  skill: 6,
} as const;

export const ADMIN_USER_TABLE_LAYOUT = {
  minimumWidthClassName: "min-w-[1120px]",
} as const;

export const ADMIN_PROFILE_FILTERS = {
  all: "all",
  complete: "complete",
  pending: "pending",
} as const;

export const ADMIN_RESULTS_FILTERS = {
  all: "all",
  canView: "can",
  cannotView: "cannot",
} as const;

export type AdminProfileFilter = typeof ADMIN_PROFILE_FILTERS[keyof typeof ADMIN_PROFILE_FILTERS];
export type AdminResultsFilter = typeof ADMIN_RESULTS_FILTERS[keyof typeof ADMIN_RESULTS_FILTERS];

export const ADMIN_USER_TABLE_COPY = {
  adminBadge: "Admin",
  detailHeader: "Detalle",
  emptyState: "No se encontraron usuarios con los filtros aplicados.",
  profileComplete: "Completo",
  profilePending: "Pendiente",
  resultAllowed: "Puede ver",
  resultDenied: "No puede",
  resultAction: "Ver perfil",
  resultUnavailable: "Sin acceso",
  searchPlaceholder: "Buscar por nombre o correo...",
  showingPrefix: "Mostrando",
  showingMiddle: "de",
  showingSuffix: "usuarios",
  unnamedUser: "Sin nombre",
} as const;

export const ADMIN_FILTER_OPTIONS = {
  profiles: [
    { value: ADMIN_PROFILE_FILTERS.all, label: "Todos los perfiles" },
    { value: ADMIN_PROFILE_FILTERS.complete, label: "Perfil completo" },
    { value: ADMIN_PROFILE_FILTERS.pending, label: "Perfil pendiente" },
  ],
  results: [
    { value: ADMIN_RESULTS_FILTERS.all, label: "Todos los accesos" },
    { value: ADMIN_RESULTS_FILTERS.canView, label: "Puede ver resultados" },
    { value: ADMIN_RESULTS_FILTERS.cannotView, label: "Sin acceso a resultados" },
  ],
} as const;

export const ADMIN_RESULTS_COPY = {
  backToAdmin: "Volver al panel",
  backToFloor: "Volver al piso",
  notFoundTitle: "Perfil no disponible",
  notFoundSubtitle: "El usuario no existe o todavia no desbloqueo sus resultados basicos.",
  pageTitle: "Perfil detallado de resultados",
  tierEyebrow: "Vista administrativa",
  tierSubtitle: "basado en pruebas completadas",
} as const;

export const ADMIN_RESULTS_ERRORS = {
  unavailable: "ADMIN_RESULTS_PROFILE_UNAVAILABLE",
} as const;
