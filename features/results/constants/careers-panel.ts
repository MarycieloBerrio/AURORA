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
  topTen: "top-ten",
  topTwenty: "top-twenty",
  topThirty: "top-thirty",
  topForty: "top-forty",
  topFifty: "top-fifty",
  topSixtyFive: "top-sixty-five",
  topEighty: "top-eighty",
  remaining: "remaining",
} as const;

export type CareerGroupId = (typeof CAREER_GROUP_IDS)[keyof typeof CAREER_GROUP_IDS];

export interface CareerGroupDefinition {
  id: CareerGroupId;
  label: string;
  upperPercentile: number;
  initiallyExpanded: boolean;
}

export const CAREER_GROUP_DEFINITIONS = [
  {
    id: CAREER_GROUP_IDS.topTen,
    label: "Top 10%",
    upperPercentile: 0.1,
    initiallyExpanded: true,
  },
  {
    id: CAREER_GROUP_IDS.topTwenty,
    label: "Top 20%",
    upperPercentile: 0.2,
    initiallyExpanded: false,
  },
  {
    id: CAREER_GROUP_IDS.topThirty,
    label: "Top 30%",
    upperPercentile: 0.3,
    initiallyExpanded: false,
  },
  {
    id: CAREER_GROUP_IDS.topForty,
    label: "Top 40%",
    upperPercentile: 0.4,
    initiallyExpanded: false,
  },
  {
    id: CAREER_GROUP_IDS.topFifty,
    label: "Top 50%",
    upperPercentile: 0.5,
    initiallyExpanded: false,
  },
  {
    id: CAREER_GROUP_IDS.topSixtyFive,
    label: "Top 65%",
    upperPercentile: 0.65,
    initiallyExpanded: false,
  },
  {
    id: CAREER_GROUP_IDS.topEighty,
    label: "Top 80%",
    upperPercentile: 0.8,
    initiallyExpanded: false,
  },
  {
    id: CAREER_GROUP_IDS.remaining,
    label: "Resto de carreras",
    upperPercentile: 1,
    initiallyExpanded: false,
  },
] as const satisfies readonly CareerGroupDefinition[];

export const CAREER_GROUP_UI_CONFIG = {
  contentIdPrefix: "career-group-content",
} as const;

export const CAREER_AFFINITY_FORMAT_CONFIG = {
  divisor: 100,
  locale: "es-CO",
  options: {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  },
} as const satisfies {
  divisor: number;
  locale: string;
  options: Intl.NumberFormatOptions;
};

export const CAREERS_PANEL_COPY = {
  affinityLabel: "Afinidad",
  title: "Carreras recomendadas",
  subtitle: `Selecciona hasta ${MAX_SELECTED_CAREERS} para comparar — Solo carreras STEM`,
  searchPlaceholder: "Buscar carrera por nombre",
  clearFilters: "Limpiar filtros y selecciones",
  levelFilterLabel: "Filtrar por nivel académico",
  emptyState: "No hay carreras que coincidan con los filtros",
} as const;
