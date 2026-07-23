import {
  CAREER_ACADEMIC_LEVEL_LABELS,
  type CareerAcademicLevel,
} from "@/constants/careers";
import { MAX_SELECTED_CAREERS } from "@/features/results/lib/career-colors";

export const CAREER_LEVEL_FILTER_ALL = "all";

export type CareerLevelFilter = typeof CAREER_LEVEL_FILTER_ALL | CareerAcademicLevel;

export const CAREER_LEVEL_FILTER_ORDER: readonly CareerAcademicLevel[] = ["UN", "TG", "TC"];

export const CAREER_LEVEL_FILTER_OPTIONS = [
  { value: CAREER_LEVEL_FILTER_ALL, label: "Todos" },
  ...CAREER_LEVEL_FILTER_ORDER.map((level) => ({
    value: level,
    label: CAREER_ACADEMIC_LEVEL_LABELS[level],
  })),
] as const;

export const CAREER_FILTER_DEFAULTS = {
  level: CAREER_LEVEL_FILTER_ALL as CareerLevelFilter,
  searchQuery: "",
} as const;

export const CAREER_SEARCH_CONFIG = {
  locale: "es",
  normalizationForm: "NFD",
  diacriticsPattern: /[\u0300-\u036f]/g,
} as const;

export const CAREER_GROUP_IDS = {
  topTwenty: "top-twenty",
  topThirty: "top-thirty",
  topForty: "top-forty",
  topFifty: "top-fifty",
  remaining: "remaining",
} as const;

export type CareerGroupId = (typeof CAREER_GROUP_IDS)[keyof typeof CAREER_GROUP_IDS];

export const CAREER_GROUP_DEFINITIONS = [
  { id: CAREER_GROUP_IDS.topTwenty, label: "Top 20%", upperPercentile: 0.2 },
  { id: CAREER_GROUP_IDS.topThirty, label: "Top 30%", upperPercentile: 0.3 },
  { id: CAREER_GROUP_IDS.topForty, label: "Top 40%", upperPercentile: 0.4 },
  { id: CAREER_GROUP_IDS.topFifty, label: "Top 50%", upperPercentile: 0.5 },
  { id: CAREER_GROUP_IDS.remaining, label: "Resto de carreras", upperPercentile: 1 },
] as const satisfies ReadonlyArray<{
  id: CareerGroupId;
  label: string;
  upperPercentile: number;
}>;

export const CAREERS_PANEL_COPY = {
  title: "Carreras recomendadas",
  subtitle: `Selecciona hasta ${MAX_SELECTED_CAREERS} para comparar — Solo carreras STEM`,
  searchPlaceholder: "Buscar carrera por nombre",
  clearFilters: "Limpiar filtros y selecciones",
  levelFilterLabel: "Filtrar por nivel académico",
  emptyState: "No hay carreras que coincidan con los filtros",
} as const;
