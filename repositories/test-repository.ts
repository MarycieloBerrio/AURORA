import { prisma } from "@/lib/prisma";

const TEST_FIELD_SELECT = {
  testRiasec1: true,
  testRiasec2: true,
  testRiasec3: true,
  testRiasec4: true,
  testHexaco1: true,
  testHexaco2: true,
  testHexaco3: true,
  testReadingComprehension: true,
  testDeductiveReasoning: true,
  testInductiveReasoning: true,
  testMathematicalReasoning: true,
  testMemorization: true,
  testPerceptualSpeed: true,
  testSpatialReasoning: true,
  testSelectiveAttention: true,
} as const;

type TestFieldKey = keyof typeof TEST_FIELD_SELECT;

export const testRepository = {
  async getTestResult(userId: string, testField: TestFieldKey) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { [testField]: true },
    });
    return user[testField] as unknown;
  },

  async saveTestResult(userId: string, testField: TestFieldKey, result: object) {
    await prisma.user.update({
      where: { id: userId },
      data: { [testField]: result },
    });
  },

  async getAllTestResults(userId: string) {
    return prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: TEST_FIELD_SELECT,
    });
  },

  async isProfileComplete(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, birthdate: true, educationalLevel: true },
    });
    return Boolean(user?.name && user.birthdate && user.educationalLevel);
  },
};

export type { TestFieldKey };
