import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { findTestById } from "@/constants/floors";
import { RIASEC_QUESTIONS } from "@/constants/questions/riasec";
import { HEXACO_QUESTIONS } from "@/constants/questions/hexaco";
import { PaginatedQuestionnaire } from "@/features/assessment/components/paginated-questionnaire";
import { authOptions } from "@/lib/auth";
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

  const questions = getQuestionsForTest(found.test.testType);
  if (!questions) notFound();

  const hasCompleted = await testService.hasCompletedTestById(session.user.id, testId);
  if (hasCompleted) {
    redirect(`/app/floor/${floorId}/test/${testId}/completed`);
  }

  return (
    <AppShellTemplate
      title={found.test.labelEs}
      subtitle={`${found.floor.nameEs} · ${found.floor.subtitleEs}`}
    >
      <PaginatedQuestionnaire
        questions={questions}
        testId={testId}
        floorId={floorId}
        accentColor={found.test.color}
        testLabel={TEST_TYPE_LABELS[found.test.testType] ?? found.test.testType}
      />
    </AppShellTemplate>
  );
}
