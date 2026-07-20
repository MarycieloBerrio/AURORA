import {
  CAREER_ACADEMIC_LEVEL_LABELS,
  type CareerAcademicLevel,
} from "@/constants/careers";
import { MAX_SELECTED_CAREERS } from "@/features/results/lib/career-colors";

export const CAREER_LEVEL_FILTER_ALL = "all";

export const CAREER_SORT_BY = {
  affinity: "affinity",
  alphabetical: "alphabetical",
} as const;

export const CAREER_SORT_DIRECTION = {
  ascending: "ascending",
  descending: "descending",
} as const;

export type CareerSortBy = (typeof CAREER_SORT_BY)[keyof typeof CAREER_SORT_BY];
export type CareerSortDirection =
  (typeof CAREER_SORT_DIRECTION)[keyof typeof CAREER_SORT_DIRECTION];
export type CareerLevelFilter = typeof CAREER_LEVEL_FILTER_ALL | CareerAcademicLevel;

export const CAREER_LEVEL_FILTER_ORDER: readonly CareerAcademicLevel[] = ["UN", "TG", "TC"];

export const CAREER_LEVEL_FILTER_OPTIONS = [
  { value: CAREER_LEVEL_FILTER_ALL, label: "Todos" },
  ...CAREER_LEVEL_FILTER_ORDER.map((level) => ({
    value: level,
    label: CAREER_ACADEMIC_LEVEL_LABELS[level],
  })),
] as const;

export const CAREER_SORT_OPTIONS = [
  { value: CAREER_SORT_BY.affinity, label: "Afinidad" },
  { value: CAREER_SORT_BY.alphabetical, label: "Alfabético" },
] as const;

export const CAREER_SORT_DIRECTION_OPTIONS: Record<
  CareerSortBy,
  ReadonlyArray<{ value: CareerSortDirection; label: string }>
> = {
  [CAREER_SORT_BY.affinity]: [
    { value: CAREER_SORT_DIRECTION.descending, label: "Mayor" },
    { value: CAREER_SORT_DIRECTION.ascending, label: "Menor" },
  ],
  [CAREER_SORT_BY.alphabetical]: [
    { value: CAREER_SORT_DIRECTION.ascending, label: "A → Z" },
    { value: CAREER_SORT_DIRECTION.descending, label: "Z → A" },
  ],
};

export const CAREER_SORT_DEFAULT_DIRECTION: Record<CareerSortBy, CareerSortDirection> = {
  [CAREER_SORT_BY.affinity]: CAREER_SORT_DIRECTION.descending,
  [CAREER_SORT_BY.alphabetical]: CAREER_SORT_DIRECTION.ascending,
};

export const CAREER_FILTER_DEFAULTS = {
  level: CAREER_LEVEL_FILTER_ALL as CareerLevelFilter,
  searchQuery: "",
  sortBy: CAREER_SORT_BY.affinity as CareerSortBy,
  sortDirection: CAREER_SORT_DIRECTION.descending as CareerSortDirection,
} as const;

export const CAREER_SEARCH_CONFIG = {
  locale: "es",
  normalizationForm: "NFD",
  diacriticsPattern: /[\u0300-\u036f]/g,
} as const;

export const CAREERS_PANEL_COPY = {
  title: "Carreras recomendadas",
  subtitle: `Selecciona hasta ${MAX_SELECTED_CAREERS} para comparar — Solo carreras STEM`,
  searchPlaceholder: "Buscar carrera por nombre",
  clearFilters: "Limpiar filtros y selecciones",
  levelFilterLabel: "Filtrar por nivel académico",
  sortByLabel: "Ordenar carreras por",
  sortDirectionLabel: "Dirección del orden",
  emptyState: "No hay carreras que coincidan con los filtros",
} as const;
