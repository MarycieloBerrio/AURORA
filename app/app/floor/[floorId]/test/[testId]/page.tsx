import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { findTestById } from "@/constants/floors";
import { getBlockQuestions as getRiasecBlockQuestions } from "@/constants/questions/riasec";
import { getBlockQuestions as getHexacoBlockQuestions } from "@/constants/questions/hexaco";
import { READING_COMPREHENSION_PASSAGE } from "@/constants/questions/reading-comprehension";
import { MATHEMATICAL_REASONING_QUESTIONS } from "@/constants/questions/mathematical-reasoning";
import { SPATIAL_REASONING_QUESTIONS } from "@/constants/questions/spatial-reasoning";
import { INDUCTIVE_REASONING_QUESTIONS } from "@/constants/questions/inductive-reasoning";
import { DEDUCTIVE_REASONING_QUESTIONS } from "@/constants/questions/deductive-reasoning";
import { SELECTIVE_ATTENTION_QUESTIONS } from "@/constants/questions/selective-attention";
import { PaginatedQuestionnaire } from "@/features/assessment/components/paginated-questionnaire";
import { ReadingComprehensionTest } from "@/features/assessment/components/reading-comprehension-test";
import { MathReasoningTest } from "@/features/assessment/components/math-reasoning-test";
import { ImageReasoningTest } from "@/features/assessment/components/image-reasoning-test";
import { SelectiveAttentionTest } from "@/features/assessment/components/selective-attention-test";
import {
  TEST_ID_SPATIAL_REASONING,
  TEST_ID_INDUCTIVE_REASONING,
  TEST_ID_DEDUCTIVE_REASONING,
  TEST_ID_SELECTIVE_ATTENTION,
} from "@/constants/assessment-tests";
import { toQuestionView } from "@/features/assessment/types";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { testService } from "@/services/test-service";
import {
  type RiasecBlock,
  type HexacoBlock,
} from "@/types/test-results";
import type { QuestionView } from "@/features/assessment/types";

interface TestPageProps {
  params: Promise<{ floorId: string; testId: string }>;
}

function getBlockQuestionsAsViews(
  testType: string,
  block: RiasecBlock | HexacoBlock | undefined
): QuestionView[] | null {
  if (!block) return null;
  if (testType === "riasec") {
    return getRiasecBlockQuestions(block as RiasecBlock).map(toQuestionView);
  }
  if (testType === "hexaco") {
    return getHexacoBlockQuestions(block as HexacoBlock).map(toQuestionView);
  }
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

  if (found.test.testType === "skill") {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: session.user.id },
      select: { activeTestId: true, activeTestStartedAt: true },
    });

    const timeLimitMinutes = found.test.timeLimitMinutes ?? 15;
    const timeLimitSeconds = timeLimitMinutes * 60;

    let activeSession: { startedAt: string; timeLimitSeconds: number } | null = null;
    if (user.activeTestId === testId && user.activeTestStartedAt) {
      const elapsed = (Date.now() - user.activeTestStartedAt.getTime()) / 1000;
      if (elapsed < timeLimitSeconds + 30) {
        activeSession = {
          startedAt: user.activeTestStartedAt.toISOString(),
          timeLimitSeconds,
        };
      } else {
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

    if (testId === TEST_ID_SPATIAL_REASONING) {
      return shell(
        <ImageReasoningTest
          questions={SPATIAL_REASONING_QUESTIONS}
          testId={testId}
          floorId={floorId}
          testLabel={found.test.labelEs}
          timeLimitMinutes={timeLimitMinutes}
          activeSession={activeSession}
        />,
      );
    }

    if (testId === TEST_ID_INDUCTIVE_REASONING) {
      return shell(
        <ImageReasoningTest
          questions={INDUCTIVE_REASONING_QUESTIONS}
          testId={testId}
          floorId={floorId}
          testLabel={found.test.labelEs}
          timeLimitMinutes={timeLimitMinutes}
          activeSession={activeSession}
        />,
      );
    }

    if (testId === TEST_ID_DEDUCTIVE_REASONING) {
      return shell(
        <ImageReasoningTest
          questions={DEDUCTIVE_REASONING_QUESTIONS}
          testId={testId}
          floorId={floorId}
          testLabel={found.test.labelEs}
          timeLimitMinutes={timeLimitMinutes}
          activeSession={activeSession}
        />,
      );
    }

    if (testId === TEST_ID_SELECTIVE_ATTENTION) {
      return shell(
        <SelectiveAttentionTest
          questions={SELECTIVE_ATTENTION_QUESTIONS}
          testId={testId}
          floorId={floorId}
          testLabel={found.test.labelEs}
          timeLimitMinutes={timeLimitMinutes}
          activeSession={activeSession}
        />,
      );
    }

    notFound();
  }

  const questions = getBlockQuestionsAsViews(found.test.testType, found.test.block);
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
