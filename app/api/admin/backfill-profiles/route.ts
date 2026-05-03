import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const RIASEC_DIMS = ["R", "I", "A", "S", "E", "C"] as const;
const HEXACO_DIMS = ["H", "E", "X", "A", "C", "O"] as const;

type RiasecBlockData = Record<(typeof RIASEC_DIMS)[number], number>;
type HexacoBlockData = Record<(typeof HEXACO_DIMS)[number], number>;
type SkillData = { points: number; max: number };

function computeProfile(user: {
  testRiasec1: unknown; testRiasec2: unknown; testRiasec3: unknown; testRiasec4: unknown;
  testHexaco1: unknown; testHexaco2: unknown; testHexaco3: unknown;
  testReadingComprehension: unknown; testDeductiveReasoning: unknown;
  testInductiveReasoning: unknown; testMathematicalReasoning: unknown;
  testSpatialReasoning: unknown; testSelectiveAttention: unknown;
}): (number | null)[] {
  const riasecBlocks = [user.testRiasec1, user.testRiasec2, user.testRiasec3, user.testRiasec4]
    .filter(Boolean) as RiasecBlockData[];

  const riasec: (number | null)[] = riasecBlocks.length > 0
    ? RIASEC_DIMS.map((dim) =>
        riasecBlocks.reduce((sum, b) => sum + (b[dim] ?? 0), 0) / riasecBlocks.length
      )
    : [null, null, null, null, null, null];

  const hexacoBlocks = [user.testHexaco1, user.testHexaco2, user.testHexaco3]
    .filter(Boolean) as HexacoBlockData[];

  const hexaco: (number | null)[] = hexacoBlocks.length > 0
    ? HEXACO_DIMS.map((dim) =>
        hexacoBlocks.reduce((sum, b) => sum + (b[dim] ?? 0), 0) / hexacoBlocks.length
      )
    : [null, null, null, null, null, null];

  const skills: (number | null)[] = [
    user.testReadingComprehension, user.testDeductiveReasoning,
    user.testInductiveReasoning,   user.testMathematicalReasoning,
    user.testSpatialReasoning,     user.testSelectiveAttention,
  ].map((f) => {
    const t = f as SkillData | null;
    return t && t.max > 0 ? t.points / t.max : null;
  });

  return [...riasec, ...hexaco, ...skills];
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  if (!session.user.isAdmin) return NextResponse.json({ message: "Acceso denegado." }, { status: 403 });

  const users = await prisma.user.findMany({
    select: {
      id: true, email: true,
      testRiasec1: true, testRiasec2: true, testRiasec3: true, testRiasec4: true,
      testHexaco1: true, testHexaco2: true, testHexaco3: true,
      testReadingComprehension: true, testDeductiveReasoning: true,
      testInductiveReasoning: true,   testMathematicalReasoning: true,
      testSpatialReasoning: true,     testSelectiveAttention: true,
    },
  });

  const candidates = users.filter((u) =>
    u.testRiasec1 || u.testRiasec2 || u.testRiasec3 || u.testRiasec4 ||
    u.testHexaco1 || u.testHexaco2 || u.testHexaco3 ||
    u.testReadingComprehension || u.testDeductiveReasoning ||
    u.testInductiveReasoning   || u.testMathematicalReasoning ||
    u.testSpatialReasoning     || u.testSelectiveAttention
  );

  const results: { email: string; dimensions: number }[] = [];

  for (const user of candidates) {
    const profile = computeProfile(user);
    await prisma.user.update({ where: { id: user.id }, data: { profile } });
    results.push({ email: user.email, dimensions: profile.filter((v) => v !== null).length });
  }

  return NextResponse.json({ updated: results.length, results });
}
