import type { CareerWithAffinity } from "@/constants/careers";
import {
  CAREER_GROUP_DEFINITIONS,
  type CareerGroupId,
} from "@/features/results/constants/careers-panel";

const STABLE_HASH_OFFSET_BASIS = 2_166_136_261;
const STABLE_HASH_PRIME = 16_777_619;

export interface CareerGroup {
  id: CareerGroupId;
  label: string;
  careers: CareerWithAffinity[];
}

function createStableOrderKey(value: string): number {
  let hash = STABLE_HASH_OFFSET_BASIS;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, STABLE_HASH_PRIME);
  }

  return hash >>> 0;
}

function orderCareersNeutrally(careers: CareerWithAffinity[]): CareerWithAffinity[] {
  return careers
    .map((career) => ({ career, orderKey: createStableOrderKey(career.onetsoc_code) }))
    .sort(
      (firstCareer, secondCareer) =>
        firstCareer.orderKey - secondCareer.orderKey ||
        firstCareer.career.onetsoc_code.localeCompare(secondCareer.career.onetsoc_code),
    )
    .map(({ career }) => career);
}

export function groupCareersByAffinity(careers: CareerWithAffinity[]): CareerGroup[] {
  const rankedCareers = [...careers].sort(
    (firstCareer, secondCareer) => secondCareer.affinity - firstCareer.affinity,
  );
  let lowerBoundary = 0;

  return CAREER_GROUP_DEFINITIONS.map((definition) => {
    const upperBoundary = Math.ceil(rankedCareers.length * definition.upperPercentile);
    const careersInGroup = rankedCareers.slice(lowerBoundary, upperBoundary);
    lowerBoundary = upperBoundary;

    return {
      id: definition.id,
      label: definition.label,
      careers: orderCareersNeutrally(careersInGroup),
    };
  });
}
