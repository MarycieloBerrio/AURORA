import type { InterestsList, PersonalityList, SkillsDict } from "@/types/test-results";
import { RIASEC_DIMENSIONS, HEXACO_DIMENSIONS } from "@/types/test-results";
import type { CareerProfile, CareerWithAffinity } from "@/constants/careers";
import { CAREERS } from "@/constants/careers";

const SKILL_KEYS: (keyof SkillsDict)[] = ["RC", "DR", "IR", "MR", "SR", "SA"];

function buildUserVector(
  interests: InterestsList,
  personality: PersonalityList,
  skills: SkillsDict,
): number[] {
  return [
    ...RIASEC_DIMENSIONS.map((d) => interests[d] / 100),
    ...HEXACO_DIMENSIONS.map((d) => personality[d] / 100),
    ...SKILL_KEYS.map((k) => skills[k]),
  ];
}

function careerVector(career: CareerProfile): number[] {
  return [
    ...RIASEC_DIMENSIONS.map((d) => career.interests[d]),
    ...HEXACO_DIMENSIONS.map((d) => career.personality[d]),
    ...SKILL_KEYS.map((k) => career.skills[k]),
  ];
}

function computeAffinity(user: number[], career: CareerProfile): number {
  const cv = careerVector(career);
  const dims = user.length;
  let sum = 0;
  for (let i = 0; i < dims; i++) {
    const diff = user[i] - cv[i];
    if (diff > 0) sum += Math.pow(diff, 0.5);
    else if (diff < 0) sum += Math.pow(diff, 2);
  }
  return Math.round(1000 * (1 - sum / dims)) / 10;
}

export function rankCareers(
  interests: InterestsList,
  personality: PersonalityList,
  skills: SkillsDict,
): CareerWithAffinity[] {
  const user = buildUserVector(interests, personality, skills);
  return CAREERS.map((career) => ({ ...career, affinity: computeAffinity(user, career) })).sort(
    (a, b) => b.affinity - a.affinity,
  );
}
