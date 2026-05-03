import { FLOORS, findTestById, type FloorConfig, type TestType } from "@/constants/floors";
import { getBlockQuestions as getRiasecBlockQuestions } from "@/constants/questions/riasec";
import { getBlockQuestions as getHexacoBlockQuestions } from "@/constants/questions/hexaco";
import { testRepository, type TestFieldKey } from "@/repositories/test-repository";
import type {
  RiasecBlockResult,
  HexacoBlockResult,
  SkillTestResult,
  InterestsList,
  PersonalityList,
  SkillsDict,
  RiasecDimension,
  HexacoDimension,
  RiasecBlock,
  HexacoBlock,
} from "@/types/test-results";
import { RIASEC_DIMENSIONS, HEXACO_DIMENSIONS } from "@/types/test-results";

export interface LikertResponse {
  questionKey: string;
  value: number;
}

const LIKERT_MIN = 0;
const LIKERT_MAX = 100;

function applyReverseScore(value: number, reversed: boolean): number {
  return reversed ? LIKERT_MIN + LIKERT_MAX - value : value;
}

function normalizeToHundred(mean: number): number {
  return Number((((mean - LIKERT_MIN) / (LIKERT_MAX - LIKERT_MIN)) * 100).toFixed(4));
}

function scoreBlock<D extends string>(
  questions: ReadonlyArray<{ id: string; dimension: D; reversed: boolean }>,
  responses: LikertResponse[]
): Record<D, number> {
  const responseMap = new Map(responses.map((r) => [r.questionKey, r.value]));
  const buckets = new Map<D, number[]>();

  for (const q of questions) {
    const raw = responseMap.get(q.id);
    if (raw === undefined) continue;
    const scored = applyReverseScore(raw, q.reversed);
    const existing = buckets.get(q.dimension) ?? [];
    existing.push(scored);
    buckets.set(q.dimension, existing);
  }

  const result = {} as Record<D, number>;
  for (const [dim, scores] of buckets.entries()) {
    const mean = scores.reduce((acc, s) => acc + s, 0) / scores.length;
    result[dim] = normalizeToHundred(mean);
  }
  return result;
}

export const testService = {
  getFloorConfig(floorId: string): FloorConfig | undefined {
    return FLOORS.find((f) => f.id === floorId);
  },

  async hasCompletedTestById(userId: string, testId: string): Promise<boolean> {
    const found = findTestById(testId);
    if (!found) return false;
    const result = await testRepository.getTestResult(userId, found.test.testField as TestFieldKey);
    return result !== null;
  },

  async getFloorCompletionStatus(userId: string, floorId: string): Promise<Map<string, boolean>> {
    const floor = FLOORS.find((f) => f.id === floorId);
    if (!floor) return new Map();

    const allResults = await testRepository.getAllTestResults(userId);
    const status = new Map<string, boolean>();
    for (const test of floor.tests) {
      const value = allResults[test.testField as keyof typeof allResults];
      status.set(test.id, value !== null);
    }
    return status;
  },

  async getGlobalProgressByType(userId: string): Promise<Record<TestType, { done: number; total: number }>> {
    const allResults = await testRepository.getAllTestResults(userId);
    const progress: Record<TestType, { done: number; total: number }> = {
      riasec: { done: 0, total: 0 },
      hexaco: { done: 0, total: 0 },
      skill: { done: 0, total: 0 },
    };

    for (const floor of FLOORS) {
      for (const test of floor.tests) {
        progress[test.testType].total++;
        const value = allResults[test.testField as keyof typeof allResults];
        if (value !== null) {
          progress[test.testType].done++;
        }
      }
    }

    return progress;
  },

  async saveRiasecResult(
    userId: string,
    testField: TestFieldKey,
    block: RiasecBlock,
    responses: LikertResponse[]
  ) {
    const blockQuestions = getRiasecBlockQuestions(block);
    const dimensionScores = scoreBlock<RiasecDimension>(blockQuestions, responses);

    const result: RiasecBlockResult = {
      block,
      itemCount: responses.length,
      date: new Date().toISOString(),
      R: dimensionScores.R ?? 0,
      I: dimensionScores.I ?? 0,
      A: dimensionScores.A ?? 0,
      S: dimensionScores.S ?? 0,
      E: dimensionScores.E ?? 0,
      C: dimensionScores.C ?? 0,
    };

    await testRepository.saveTestResult(userId, testField, result);
    return result;
  },

  async saveHexacoResult(
    userId: string,
    testField: TestFieldKey,
    block: HexacoBlock,
    responses: LikertResponse[]
  ) {
    const blockQuestions = getHexacoBlockQuestions(block);
    const dimensionScores = scoreBlock<HexacoDimension>(blockQuestions, responses);

    const result: HexacoBlockResult = {
      block,
      itemCount: responses.length,
      date: new Date().toISOString(),
      H: dimensionScores.H ?? 0,
      E: dimensionScores.E ?? 0,
      X: dimensionScores.X ?? 0,
      A: dimensionScores.A ?? 0,
      C: dimensionScores.C ?? 0,
      O: dimensionScores.O ?? 0,
    };

    await testRepository.saveTestResult(userId, testField, result);
    return result;
  },

  async saveSkillResult(
    userId: string,
    testField: TestFieldKey,
    input: { max: number; points: number; timeTakenSeconds?: number }
  ) {
    const result: SkillTestResult = {
      max: input.max,
      date: new Date().toISOString(),
      points: input.points,
      timeTakenSeconds: input.timeTakenSeconds,
    };

    await testRepository.saveTestResult(userId, testField, result);
    return result;
  },

  async computeInterests(userId: string): Promise<InterestsList> {
    const data = await testRepository.getAllTestResults(userId);
    const riasecFields = [data.testRiasec1, data.testRiasec2, data.testRiasec3, data.testRiasec4];
    const completed = riasecFields.filter(Boolean) as unknown as RiasecBlockResult[];

    if (completed.length === 0) {
      return { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    }

    const result = {} as InterestsList;
    for (const dim of RIASEC_DIMENSIONS) {
      result[dim] = completed.reduce((sum, t) => sum + t[dim], 0) / completed.length;
    }
    return result;
  },

  async computePersonality(userId: string): Promise<PersonalityList> {
    const data = await testRepository.getAllTestResults(userId);
    const hexacoFields = [data.testHexaco1, data.testHexaco2, data.testHexaco3];
    const completed = hexacoFields.filter(Boolean) as unknown as HexacoBlockResult[];

    if (completed.length === 0) {
      return { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
    }

    const result = {} as PersonalityList;
    for (const dim of HEXACO_DIMENSIONS) {
      result[dim] = completed.reduce((sum, t) => sum + t[dim], 0) / completed.length;
    }
    return result;
  },

  async computeSkills(userId: string): Promise<SkillsDict> {
    const data = await testRepository.getAllTestResults(userId);

    const fieldToKey: [string, keyof SkillsDict][] = [
      ["testReadingComprehension", "RC"],
      ["testDeductiveReasoning", "DR"],
      ["testInductiveReasoning", "IR"],
      ["testMathematicalReasoning", "MR"],
      ["testSpatialReasoning", "SR"],
      ["testSelectiveAttention", "SA"],
    ];

    const result = {} as SkillsDict;
    for (const [field, key] of fieldToKey) {
      const test = data[field as keyof typeof data] as SkillTestResult | null;
      result[key] = test ? test.points / test.max : 0;
    }
    return result;
  },
};
