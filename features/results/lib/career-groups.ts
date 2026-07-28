import type { CareerWithAffinity } from "@/constants/careers";
import {
  CAREER_GROUP_DEFINITIONS,
  type CareerGroupId,
} from "@/features/results/constants/careers-panel";

export interface CareerGroup {
  id: CareerGroupId;
  label: string;
  careers: CareerWithAffinity[];
  initiallyExpanded: boolean;
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
      careers: careersInGroup,
      initiallyExpanded: definition.initiallyExpanded,
    };
  });
}
