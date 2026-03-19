import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { findTestById } from "@/constants/floors";
import { RIASEC_QUESTIONS } from "@/constants/questions/riasec";
import { HEXACO_QUESTIONS } from "@/constants/questions/hexaco";
import { READING_COMPREHENSION_PASSAGE } from "@/constants/questions/reading-comprehension";
import { MATHEMATICAL_REASONING_QUESTIONS } from "@/constants/questions/mathematical-reasoning";
import { PaginatedQuestionnaire } from "@/features/assessment/components/paginated-questionnaire";
import { ReadingComprehensionTest } from "@/features/assessment/components/reading-comprehension-test";
import { MathReasoningTest } from "@/features/assessment/components/math-reasoning-test";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { testService } from "@/services/test-service";

interface TestPageProps {
  params: Promise<{ floorId: string; testId: string }>;
}

function getQuestionsForTest(testType: string) {
  if (testType === "riasec") return RIASEC_QUESTIONS;
  if (testType === "hexaco") return HEXACO_QUESTIONS;
  return null;
}

const TEST_TYPE_LABELS: Record<string, string> = {
  riasec: "Intereses",
  hexaco: "Personalidad",
  skill: "Aptitudes",
};

export default async function TestPage({ params }: TestPageProps) {
  const { floorId, testId } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.profileCompleted) redirect("/welcome/complete-profile");

  const found = findTestById(testId);
  if (!found || found.floor.id !== floorId) notFound();

  const hasCompleted = await testService.hasCompletedTestById(session.user.id, testId);
  if (hasCompleted) {
    redirect(`/app/floor/${floorId}/test/${testId}/completed`);
  }

  const shell = (children: React.ReactNode) => (
    <AppShellTemplate
      title={found.test.labelEs}
      subtitle={`${found.floor.nameEs} · ${found.floor.subtitleEs}`}
    >
      {children}
    </AppShellTemplate>
  );

  // Skill tests — each has its own interface with timer
  if (found.test.testType === "skill") {
    // Check for active test session
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: session.user.id },
      select: { activeTestId: true, activeTestStartedAt: true },
    });

    const timeLimitMinutes = found.test.timeLimitMinutes ?? 15;
    const timeLimitSeconds = timeLimitMinutes * 60;

    let activeSession: { startedAt: string; timeLimitSeconds: number } | null = null;
    if (user.activeTestId === testId && user.activeTestStartedAt) {
      // Check if the session has expired
      const elapsed = (Date.now() - user.activeTestStartedAt.getTime()) / 1000;
      if (elapsed < timeLimitSeconds + 30) {
        // Still valid (with 30s grace for network delay)
        activeSession = {
          startedAt: user.activeTestStartedAt.toISOString(),
          timeLimitSeconds,
        };
      } else {
        // Expired session — clear it
        await prisma.user.update({
          where: { id: session.user.id },
          data: { activeTestId: null, activeTestStartedAt: null },
        });
      }
    }

    if (testId === "reading-comprehension") {
      return shell(
        <ReadingComprehensionTest
          passage={READING_COMPREHENSION_PASSAGE}
          testId={testId}
          floorId={floorId}
          testLabel={found.test.labelEs}
          timeLimitMinutes={timeLimitMinutes}
          activeSession={activeSession}
        />,
      );
    }

    if (testId === "mathematical-reasoning") {
      return shell(
        <MathReasoningTest
          questions={MATHEMATICAL_REASONING_QUESTIONS}
          testId={testId}
          floorId={floorId}
          testLabel={found.test.labelEs}
          timeLimitMinutes={timeLimitMinutes}
          activeSession={activeSession}
        />,
      );
    }

    // Other skill tests not yet implemented
    notFound();
  }

  // Likert-based tests (riasec, hexaco)
  const questions = getQuestionsForTest(found.test.testType);
  if (!questions) notFound();

  return shell(
    <PaginatedQuestionnaire
      questions={questions}
      testId={testId}
      floorId={floorId}
      accentColor={found.test.color}
      testLabel={TEST_TYPE_LABELS[found.test.testType] ?? found.test.testType}
    />,
  );
}
