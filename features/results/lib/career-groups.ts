import type { CareerWithAffinity } from "@/constants/careers";
import {
  AFFINITY_CATEGORY_DEFINITIONS,
  AFFINITY_CATEGORY_ERROR_MESSAGES,
  AFFINITY_SCORE_LIMITS,
  type AffinityCategoryDefinition,
  type AffinityCategoryId,
} from "@/features/results/constants/affinity-categories";

export interface CareerAffinityGroup {
  id: AffinityCategoryId;
  label: string;
  careers: CareerWithAffinity[];
}

export function resolveAffinityCategory(affinity: number): AffinityCategoryDefinition {
  const isInvalidAffinity =
    !Number.isFinite(affinity) ||
    affinity < AFFINITY_SCORE_LIMITS.minimum ||
    affinity > AFFINITY_SCORE_LIMITS.maximum;

  if (isInvalidAffinity) {
    throw new Error(AFFINITY_CATEGORY_ERROR_MESSAGES.invalidScore);
  }

  const category = AFFINITY_CATEGORY_DEFINITIONS.find(
    (definition) => affinity > definition.minimumExclusive,
  );

  if (!category) {
    throw new Error(AFFINITY_CATEGORY_ERROR_MESSAGES.unresolvedCategory);
  }

  return category;
}

export function groupCareersByAffinityCategory(
  careers: CareerWithAffinity[],
): CareerAffinityGroup[] {
  const rankedCareers = [...careers].sort(
    (firstCareer, secondCareer) => secondCareer.affinity - firstCareer.affinity,
  );

  return AFFINITY_CATEGORY_DEFINITIONS.map((category) => ({
    id: category.id,
    label: category.label,
    careers: rankedCareers.filter(
      (career) => resolveAffinityCategory(career.affinity).id === category.id,
    ),
  }));
}
