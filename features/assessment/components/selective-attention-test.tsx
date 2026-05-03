"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/atoms/card";
import { AttentionGridCell, type CellStatus } from "@/components/atoms/attention-grid-cell";
import { TestTimerBar } from "@/features/assessment/components/test-timer-bar";
import { SkillTestIntro } from "@/features/assessment/components/skill-test-intro";
import type { AttentionCellContent, AttentionQuestion } from "@/features/assessment/types";

const ADVANCE_DELAY_MS = 900;
const PROMPT = "Encuentra y pulsa el elemento diferente en la matriz.";

interface SelectiveAttentionTestProps {
  questions: AttentionQuestion[];
  testId: string;
  testLabel: string;
  timeLimitMinutes: number;
  activeSession?: { startedAt: string; timeLimitSeconds: number } | null;
}

interface AnswerRecord {
  clickedIndex: number;
  isCorrect: boolean;
}

function buildGridCells(
  question: AttentionQuestion,
  targetIndex: number,
): AttentionCellContent[] {
  const total = question.gridRows * question.gridCols;
  const cells: AttentionCellContent[] = Array(total).fill(question.distractorContent);
  cells[targetIndex] = question.targetContent;
  return cells;
}

function getCellStatus(
  cellIndex: number,
  targetIndex: number,
  answer: AnswerRecord | undefined,
): CellStatus {
  if (!answer) return "idle";
  if (cellIndex === answer.clickedIndex) return answer.isCorrect ? "correct" : "incorrect";
  if (!answer.isCorrect && cellIndex === targetIndex) return "revealed";
  return "dimmed";
}

function buildGridMaxWidth(gridCols: number, isImageGrid: boolean): string {
  const cellPx = isImageGrid ? 72 : gridCols <= 3 ? 72 : gridCols <= 5 ? 56 : 44;
  const gapPx = 6;
  return `${gridCols * cellPx + (gridCols - 1) * gapPx}px`;
}

function buildFontSize(gridCols: number): string {
  if (gridCols <= 3) return "1.25rem";
  if (gridCols <= 5) return "0.875rem";
  return "0.75rem";
}

export function SelectiveAttentionTest({
  questions,
  testId,
  testLabel,
  timeLimitMinutes,
  activeSession,
}: SelectiveAttentionTestProps) {
  const router = useRouter();
  const [session, setSession] = useState(activeSession ?? null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const submittedRef = useRef(false);

  const targetIndices = useMemo(
    () =>
      Object.fromEntries(
        questions.map((q) => [
          q.key,
          Math.floor(Math.random() * q.gridRows * q.gridCols),
        ]),
      ),
    [questions],
  );

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.key];
  const currentTargetIndex = targetIndices[currentQuestion.key] ?? 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const isImageGrid = currentQuestion.distractorContent.type === "image";

  const gridCells = useMemo(
    () => buildGridCells(currentQuestion, currentTargetIndex),
    [currentQuestion, currentTargetIndex],
  );

  const doSubmit = useCallback(
    async (force?: boolean) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setIsSubmitting(true);

      const maxPoints = questions.reduce((sum, q) => sum + (q.points ?? 1), 0);
      const earnedPoints = questions.reduce(
        (sum, q) => (answers[q.key]?.isCorrect ? sum + (q.points ?? 1) : sum),
        0,
      );

      try {
        const response = await fetch(`/api/assessment/${testId}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ max: maxPoints, points: earnedPoints }),
        });

        if (!response.ok) {
          const parsed = (await response.json()) as { message?: string };
          setErrorMessage(parsed.message ?? "No se pudieron guardar las respuestas.");
          setIsSubmitting(false);
          submittedRef.current = false;
          return;
        }

        router.push(`/app/floor/${testId}/completed`);
        router.refresh();
      } catch {
        setErrorMessage("Hubo un problema de conexión. Inténtalo nuevamente.");
        setIsSubmitting(false);
        submittedRef.current = false;
      }
    },
    [answers, questions, router, testId],
  );

  const handleTimeUp = useCallback(() => doSubmit(true), [doSubmit]);

  useEffect(() => {
    if (!currentAnswer) return;
    const timer = setTimeout(() => {
      if (isLastQuestion) {
        doSubmit(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, ADVANCE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [currentAnswer, isLastQuestion, doSubmit]);

  const handleCellClick = (cellIndex: number) => {
    if (currentAnswer || isSubmitting) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: {
        clickedIndex: cellIndex,
        isCorrect: cellIndex === currentTargetIndex,
      },
    }));
  };

  if (!session) {
    return (
      <SkillTestIntro
        testLabel={testLabel}
        testId={testId}
        timeLimitMinutes={timeLimitMinutes}
        onStart={setSession}
      />
    );
  }

  const progress = (currentIndex / questions.length) * 100;

  return (
    <>
      <TestTimerBar
        startedAt={session.startedAt}
        timeLimitSeconds={session.timeLimitSeconds}
        onTimeUp={handleTimeUp}
      />

      <Card className="mx-auto max-w-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            {testLabel}
          </span>
        </div>

        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mb-6 text-center text-sm font-medium text-slate-700">{PROMPT}</p>

        {currentAnswer ? (
          <div
            className={`mb-5 rounded-xl px-4 py-2.5 text-center text-sm font-semibold ${
              currentAnswer.isCorrect
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {currentAnswer.isCorrect ? "Correcto" : "Incorrecto"}
          </div>
        ) : null}

        <div className="flex justify-center">
          <div
            key={currentQuestion.key}
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${currentQuestion.gridCols}, minmax(0, 1fr))`,
              maxWidth: buildGridMaxWidth(currentQuestion.gridCols, isImageGrid),
              fontSize: isImageGrid ? undefined : buildFontSize(currentQuestion.gridCols),
              width: "100%",
            }}
          >
            {gridCells.map((content, idx) => (
              <AttentionGridCell
                key={idx}
                content={content}
                status={getCellStatus(idx, currentTargetIndex, currentAnswer)}
                onClick={() => handleCellClick(idx)}
              />
            ))}
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-4 text-center text-sm text-rose-600">{errorMessage}</p>
        ) : null}
      </Card>
    </>
  );
}
