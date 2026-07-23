import type { InterestsList, PersonalityList, SkillsDict } from "@/types/test-results";
import { RIASEC_DIMENSIONS, HEXACO_DIMENSIONS } from "@/types/test-results";
import type { CareerProfile, CareerWithAffinity } from "@/constants/careers";
import { CAREERS } from "@/constants/careers";

const SKILL_KEYS: (keyof SkillsDict)[] = ["RC", "DR", "IR", "MR", "SR", "SA"];
const AFFINITY_SCALE = {
  maxScore: 1,
  minScore: 0,
  percent: 100,
  oneDecimal: 10,
  deficitExponent: 1 / 3,
  surplusExponent: 3,
} as const;

const AFFINITY_ERROR_MESSAGES = {
  vectorLengthMismatch: "AFFINITY_VECTOR_LENGTH_MISMATCH",
} as const;

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

function buildCareerVector(career: CareerProfile): number[] {
  return [
    ...RIASEC_DIMENSIONS.map((d) => career.interests[d]),
    ...HEXACO_DIMENSIONS.map((d) => career.personality[d]),
    ...SKILL_KEYS.map((k) => career.skills[k]),
  ];
}

function assertSameVectorLength(user: number[], career: number[]): void {
  if (user.length === career.length) return;
  throw new Error(AFFINITY_ERROR_MESSAGES.vectorLengthMismatch);
}

function computeDimensionPenalty(userScore: number, careerScore: number): number {
  const deficit = Math.max(careerScore - userScore, AFFINITY_SCALE.minScore);
  const surplus = Math.max(userScore - careerScore, AFFINITY_SCALE.minScore);

  return (
    Math.pow(deficit, AFFINITY_SCALE.deficitExponent) +
    Math.pow(surplus, AFFINITY_SCALE.surplusExponent)
  );
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * AFFINITY_SCALE.oneDecimal) / AFFINITY_SCALE.oneDecimal;
}

function computeAffinity(user: number[], career: CareerProfile): number {
  const careerProfile = buildCareerVector(career);
  assertSameVectorLength(user, careerProfile);

  const penalty = user.reduce(
    (total, score, index) => total + computeDimensionPenalty(score, careerProfile[index]),
    AFFINITY_SCALE.minScore,
  );
  const normalizedScore = AFFINITY_SCALE.maxScore - penalty / user.length;

  return roundToOneDecimal(normalizedScore * AFFINITY_SCALE.percent);
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
