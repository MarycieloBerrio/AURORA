import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demoPasswordHash = await hash("Demo12345!", 10);

  const demoRiasecResult = {
    questions: 24,
    date: new Date().toISOString(),
    R: 14,
    I: 16,
    A: 18,
    S: 12,
    E: 10,
    C: 8,
  };

  await prisma.user.upsert({
    where: { email: "demo@aurora.app" },
    update: {
      passwordHash: demoPasswordHash,
      name: "Usuario Demo",
      gender: "PREFER_NOT_TO_SAY",
      birthdate: new Date("2000-01-15"),
      educationalLevel: "UNIVERSITY",
      testRiasec1: demoRiasecResult,
    },
    create: {
      email: "demo@aurora.app",
      name: "Usuario Demo",
      passwordHash: demoPasswordHash,
      gender: "PREFER_NOT_TO_SAY",
      birthdate: new Date("2000-01-15"),
      educationalLevel: "UNIVERSITY",
      testRiasec1: demoRiasecResult,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
