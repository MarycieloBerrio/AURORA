import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { findTestById } from "@/constants/floors";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { testRepository, type TestFieldKey } from "@/repositories/test-repository";

export async function POST(_request: Request, { params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }
  if (!session.user.profileCompleted) {
    return NextResponse.json({ message: "Debes completar tu perfil antes de continuar." }, { status: 403 });
  }

  const found = findTestById(testId);
  if (!found || found.test.testType !== "skill") {
    return NextResponse.json({ message: "Prueba no encontrada." }, { status: 404 });
  }

  // Check if already completed
  const existing = await testRepository.getTestResult(
    session.user.id,
    found.test.testField as TestFieldKey,
  );
  if (existing !== null) {
    return NextResponse.json({ message: "Ya completaste esta prueba." }, { status: 409 });
  }

  const timeLimitSeconds = (found.test.timeLimitMinutes ?? 15) * 60;

  // Check if there's already an active session for this test
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { activeTestId: true, activeTestStartedAt: true },
  });

  if (user.activeTestId === testId && user.activeTestStartedAt) {
    // Session already exists — return it (handles page reloads)
    return NextResponse.json({
      startedAt: user.activeTestStartedAt.toISOString(),
      timeLimitSeconds,
    });
  }

  // Start a new session (clears any previous active test)
  const now = new Date();
  await prisma.user.update({
    where: { id: session.user.id },
    data: { activeTestId: testId, activeTestStartedAt: now },
  });

  return NextResponse.json({
    startedAt: now.toISOString(),
    timeLimitSeconds,
  });
}
