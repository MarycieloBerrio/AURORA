export type ResultTier = "minimum" | "intermediate" | "complete";

/** Round to 1 decimal place; drop the decimal if it's a whole number. */
export function formatScore(v: number): string {
  return parseFloat(v.toFixed(1)).toString();
}

const TIER_THRESHOLDS: Array<{
  tier: ResultTier;
  riasec: number;
  hexaco: number;
  skill: number;
}> = [
  { tier: "complete", riasec: 4, hexaco: 3, skill: 6 },
  { tier: "intermediate", riasec: 3, hexaco: 2, skill: 4 },
  { tier: "minimum", riasec: 1, hexaco: 1, skill: 1 },
];

export function computeResultTier(
  riasecDone: number,
  hexacoDone: number,
  skillDone: number,
): ResultTier | null {
  for (const { tier, riasec, hexaco, skill } of TIER_THRESHOLDS) {
    if (riasecDone >= riasec && hexacoDone >= hexaco && skillDone >= skill) {
      return tier;
    }
  }
  return null;
}

export function hasMinimumResults(
  riasecDone: number,
  hexacoDone: number,
  skillDone: number,
): boolean {
  const last = TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
  return riasecDone >= last.riasec && hexacoDone >= last.hexaco && skillDone >= last.skill;
}
