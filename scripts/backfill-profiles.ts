/**
 * scripts/backfill-profiles.ts
 *
 * Recalcula y persiste el vector profile para todos los usuarios
 * que ya tienen al menos un test completado.
 *
 * Uso:
 *   npx tsx scripts/backfill-profiles.ts
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RIASEC_DIMS = ["R", "I", "A", "S", "E", "C"] as const;
const HEXACO_DIMS = ["H", "E", "X", "A", "C", "O"] as const;

type RiasecBlock = Record<(typeof RIASEC_DIMS)[number], number>;
type HexacoBlock = Record<(typeof HEXACO_DIMS)[number], number>;
type SkillResult  = { points: number; max: number };

function computeProfile(user: {
  testRiasec1: unknown; testRiasec2: unknown; testRiasec3: unknown; testRiasec4: unknown;
  testHexaco1: unknown; testHexaco2: unknown; testHexaco3: unknown;
  testReadingComprehension:  unknown;
  testDeductiveReasoning:    unknown;
  testInductiveReasoning:    unknown;
  testMathematicalReasoning: unknown;
  testSpatialReasoning:      unknown;
  testSelectiveAttention:    unknown;
}): (number | null)[] {
  // RIASEC — promedio de bloques completados, null si ninguno
  const riasecBlocks = [user.testRiasec1, user.testRiasec2, user.testRiasec3, user.testRiasec4]
    .filter(Boolean) as RiasecBlock[];

  const riasec: (number | null)[] = riasecBlocks.length > 0
    ? RIASEC_DIMS.map((dim) =>
        riasecBlocks.reduce((sum, b) => sum + (b[dim] ?? 0), 0) / riasecBlocks.length
      )
    : [null, null, null, null, null, null];

  // HEXACO — promedio de bloques completados, null si ninguno
  const hexacoBlocks = [user.testHexaco1, user.testHexaco2, user.testHexaco3]
    .filter(Boolean) as HexacoBlock[];

  const hexaco: (number | null)[] = hexacoBlocks.length > 0
    ? HEXACO_DIMS.map((dim) =>
        hexacoBlocks.reduce((sum, b) => sum + (b[dim] ?? 0), 0) / hexacoBlocks.length
      )
    : [null, null, null, null, null, null];

  // Skills — ratio puntos/max por prueba, null si no completada
  const skillFields = [
    user.testReadingComprehension,
    user.testDeductiveReasoning,
    user.testInductiveReasoning,
    user.testMathematicalReasoning,
    user.testSpatialReasoning,
    user.testSelectiveAttention,
  ];
  const skills: (number | null)[] = skillFields.map((f) => {
    const t = f as SkillResult | null;
    return t && t.max > 0 ? t.points / t.max : null;
  });

  return [...riasec, ...hexaco, ...skills];
}

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      testRiasec1: true, testRiasec2: true, testRiasec3: true, testRiasec4: true,
      testHexaco1: true, testHexaco2: true, testHexaco3: true,
      testReadingComprehension:  true,
      testDeductiveReasoning:    true,
      testInductiveReasoning:    true,
      testMathematicalReasoning: true,
      testSpatialReasoning:      true,
      testSelectiveAttention:    true,
    },
  });

  const candidates = users.filter((u) =>
    u.testRiasec1 || u.testRiasec2 || u.testRiasec3 || u.testRiasec4 ||
    u.testHexaco1 || u.testHexaco2 || u.testHexaco3 ||
    u.testReadingComprehension || u.testDeductiveReasoning ||
    u.testInductiveReasoning   || u.testMathematicalReasoning ||
    u.testSpatialReasoning     || u.testSelectiveAttention
  );

  console.log(`Usuarios totales: ${users.length}`);
  console.log(`Con al menos un test: ${candidates.length}`);
  console.log("Actualizando...\n");

  let updated = 0;
  for (const user of candidates) {
    const profile = computeProfile(user);
    const nonNull = profile.filter((v) => v !== null).length;
    await prisma.user.update({
      where: { id: user.id },
      data: { profile },
    });
    updated++;
    console.log(`  ✓ ${user.email} — ${nonNull}/18 dimensiones calculadas`);
  }

  console.log(`\nListo. ${updated} usuarios actualizados.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
