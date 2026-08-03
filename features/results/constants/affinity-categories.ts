export const CAREER_AFFINITY_DISPLAY_MODES = {
  category: "category",
  exact: "exact",
} as const;

export type CareerAffinityDisplayMode =
  (typeof CAREER_AFFINITY_DISPLAY_MODES)[keyof typeof CAREER_AFFINITY_DISPLAY_MODES];

export const AFFINITY_SCORE_LIMITS = {
  minimum: 0,
  medium: 50,
  high: 70,
  veryHigh: 85,
  maximum: 100,
} as const;

export const AFFINITY_CATEGORY_IDS = {
  veryHigh: "very-high",
  high: "high",
  medium: "medium",
  low: "low",
} as const;

export type AffinityCategoryId =
  (typeof AFFINITY_CATEGORY_IDS)[keyof typeof AFFINITY_CATEGORY_IDS];

export type AffinityThermometerLevel = 1 | 2 | 3 | 4;

export interface AffinityCategoryDefinition {
  id: AffinityCategoryId;
  label: string;
  minimumExclusive: number;
  thermometerLevel: AffinityThermometerLevel;
  colorClassName: string;
  surfaceClassName: string;
}

export const AFFINITY_CATEGORY_DEFINITIONS = [
  {
    id: AFFINITY_CATEGORY_IDS.veryHigh,
    label: "Muy alta",
    minimumExclusive: AFFINITY_SCORE_LIMITS.veryHigh,
    thermometerLevel: 4,
    colorClassName: "text-rose-600",
    surfaceClassName: "border-rose-200 bg-rose-50",
  },
  {
    id: AFFINITY_CATEGORY_IDS.high,
    label: "Alta",
    minimumExclusive: AFFINITY_SCORE_LIMITS.high,
    thermometerLevel: 3,
    colorClassName: "text-orange-500",
    surfaceClassName: "border-orange-200 bg-orange-50",
  },
  {
    id: AFFINITY_CATEGORY_IDS.medium,
    label: "Media",
    minimumExclusive: AFFINITY_SCORE_LIMITS.medium,
    thermometerLevel: 2,
    colorClassName: "text-amber-500",
    surfaceClassName: "border-amber-200 bg-amber-50",
  },
  {
    id: AFFINITY_CATEGORY_IDS.low,
    label: "Baja",
    minimumExclusive: Number.NEGATIVE_INFINITY,
    thermometerLevel: 1,
    colorClassName: "text-sky-600",
    surfaceClassName: "border-sky-200 bg-sky-50",
  },
] as const satisfies readonly AffinityCategoryDefinition[];

export const AFFINITY_CATEGORY_ERROR_MESSAGES = {
  invalidScore: "AFFINITY_SCORE_OUT_OF_RANGE",
  unresolvedCategory: "AFFINITY_CATEGORY_NOT_FOUND",
} as const;

export const AFFINITY_UI_CONFIG = {
  groupContentIdPrefix: "career-affinity-group-content",
  legendTitleId: "career-affinity-legend-title",
  indicatorSelector: "[data-affinity-indicator]",
  groupsInitiallyExpanded: true,
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

export const AFFINITY_COPY = {
  ariaLabel: "Afinidad",
  legendTitle: "Cómo interpretar la afinidad",
} as const;
