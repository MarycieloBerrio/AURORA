import { computeResultTier, type ResultTier } from "@/features/results/lib/result-tier";
import { rankCareers } from "@/features/results/lib/affinity";
import { testService } from "@/services/test-service";
import type { CareerWithAffinity } from "@/constants/careers";
import type { InterestsList, PersonalityList, SkillsDict } from "@/types/test-results";

export interface ResultsProfile {
  careers: CareerWithAffinity[];
  interests: InterestsList;
  personality: PersonalityList;
  skills: SkillsDict;
  tier: ResultTier;
}

export async function getResultsProfile(userId: string): Promise<ResultsProfile | null> {
  const [interests, personality, skills, progress] = await Promise.all([
    testService.computeInterests(userId),
    testService.computePersonality(userId),
    testService.computeSkills(userId),
    testService.getGlobalProgressByType(userId),
  ]);

  const tier = computeResultTier(
    progress.riasec.done,
    progress.hexaco.done,
    progress.skill.done,
  );

  if (!tier) return null;

  return {
    careers: rankCareers(interests, personality, skills),
    interests,
    personality,
    skills,
    tier,
  };
}
