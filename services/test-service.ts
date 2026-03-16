import { FLOORS, findTestById, type FloorConfig, type TestType } from "@/constants/floors";
import { RIASEC_QUESTIONS } from "@/constants/questions/riasec";
import { HEXACO_QUESTIONS } from "@/constants/questions/hexaco";
import { testRepository, type TestFieldKey } from "@/repositories/test-repository";
import type {
  LikertValue,
  RiasecTestResult,
  HexacoTestResult,
  SkillTestResult,
  InterestsList,
  PersonalityList,
  SkillsDict,
  RiasecDimension,
  HexacoDimension,
} from "@/types/test-results";
import { RIASEC_DIMENSIONS, HEXACO_DIMENSIONS } from "@/types/test-results";

// --- Input types ---

export interface LikertResponse {
  questionKey: string;
  value: LikertValue;
}

// --- Service ---

export const testService = {
  getFloorConfig(floorId: string): FloorConfig | undefined {
    return FLOORS.find((f) => f.id === floorId);
  },

  /** Check if a specific test (by testId) has been completed */
  async hasCompletedTestById(userId: string, testId: string): Promise<boolean> {
    const found = findTestById(testId);
    if (!found) return false;
    const result = await testRepository.getTestResult(userId, found.test.testField as TestFieldKey);
    return result !== null;
  },

  /** Get completion status for all tests on a floor */
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

  /** Get global completion progress grouped by test type */
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

  async saveRiasecResult(userId: string, testField: TestFieldKey, responses: LikertResponse[]) {
    const scores: Record<RiasecDimension, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const questionsByKey = new Map(RIASEC_QUESTIONS.map((q) => [q.key, q]));

    for (const r of responses) {
      const question = questionsByKey.get(r.questionKey);
      if (question) {
        scores[question.dimension] += r.value;
      }
    }

    const result: RiasecTestResult = {
      questions: responses.length,
      date: new Date().toISOString(),
      ...scores,
    };

    await testRepository.saveTestResult(userId, testField, result);
    return result;
  },

  async saveHexacoResult(userId: string, testField: TestFieldKey, responses: LikertResponse[]) {
    const scores: Record<HexacoDimension, number> = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
    const questionsByKey = new Map(HEXACO_QUESTIONS.map((q) => [q.key, q]));

    for (const r of responses) {
      const question = questionsByKey.get(r.questionKey);
      if (question) {
        scores[question.dimension] += r.value;
      }
    }

    const result: HexacoTestResult = {
      questions: responses.length,
      date: new Date().toISOString(),
      ...scores,
    };

    await testRepository.saveTestResult(userId, testField, result);
    return result;
  },

  async saveSkillResult(
    userId: string,
    testField: TestFieldKey,
    input: { max: number; points: number }
  ) {
    const result: SkillTestResult = {
      max: input.max,
      date: new Date().toISOString(),
      points: input.points,
    };

    await testRepository.saveTestResult(userId, testField, result);
    return result;
  },

  async computeInterests(userId: string): Promise<InterestsList> {
    const data = await testRepository.getAllTestResults(userId);
    const riasecFields = [data.testRiasec1, data.testRiasec2, data.testRiasec3, data.testRiasec4];
    const completed = riasecFields.filter(Boolean) as unknown as RiasecTestResult[];

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
    const completed = hexacoFields.filter(Boolean) as unknown as HexacoTestResult[];

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
      ["testMemorization", "MM"],
      ["testPerceptualSpeed", "PS"],
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
