"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { McOptionCard } from "@/features/assessment/components/mc-option-card";
import { TestTimerBar } from "@/features/assessment/components/test-timer-bar";
import { SkillTestIntro } from "@/features/assessment/components/skill-test-intro";
import type { ReadingPassage } from "@/features/assessment/types";

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

interface ReadingComprehensionTestProps {
  passages: ReadingPassage[];
  testId: string;
  testLabel: string;
  timeLimitMinutes: number;
  activeSession?: { startedAt: string; timeLimitSeconds: number } | null;
}

export function ReadingComprehensionTest({
  passages,
  testId,
  testLabel,
  timeLimitMinutes,
  activeSession,
}: ReadingComprehensionTestProps) {
  const router = useRouter();
  const [session, setSession] = useState(activeSession ?? null);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const allQuestions = useMemo(() => passages.flatMap((p) => p.questions), [passages]);
  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const shuffledOptionsMap = useMemo(
    () =>
      Object.fromEntries(
        allQuestions.map((q) => [q.key, [...q.options].sort(() => Math.random() - 0.5)]),
      ),
    [allQuestions],
  );

  const currentPassage = passages[currentPassageIndex];
  const isFirstPassage = currentPassageIndex === 0;
  const isLastPassage = currentPassageIndex === passages.length - 1;

  const handleSelect = (questionKey: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: optionId }));
    setErrorMessage("");
  };

  const doSubmit = useCallback(
    async (force?: boolean) => {
      if (submittedRef.current) return;
      if (!force && !allAnswered) {
        setErrorMessage("Debes responder todas las preguntas antes de finalizar.");
        return;
      }

      submittedRef.current = true;
      setIsSubmitting(true);
      setErrorMessage("");

      const maxPoints = allQuestions.reduce((sum, q) => sum + (q.points ?? 1), 0);
      const currentPoints = allQuestions.reduce(
        (sum, q) => (answers[q.key] === q.correctOptionId ? sum + (q.points ?? 1) : sum),
        0,
      );

      try {
        const response = await fetch(`/api/assessment/${testId}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ max: maxPoints, points: currentPoints }),
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
    [allAnswered, allQuestions, answers, router, testId],
  );

  const handleTimeUp = useCallback(() => {
    doSubmit(true);
  }, [doSubmit]);

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

  const passageAnsweredCount = currentPassage.questions.filter(
    (q) => answers[q.key] !== undefined,
  ).length;

  return (
    <>
      <TestTimerBar
        startedAt={session.startedAt}
        timeLimitSeconds={session.timeLimitSeconds}
        onTimeUp={handleTimeUp}
      />

      {/* Passage tabs */}
      <div className="mb-3 flex gap-2 overflow-x-auto">
        {passages.map((passage, idx) => {
          const count = passage.questions.filter((q) => answers[q.key] !== undefined).length;
          const allDone = count === passage.questions.length;
          return (
            <button
              key={passage.id}
              type="button"
              onClick={() => setCurrentPassageIndex(idx)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                idx === currentPassageIndex
                  ? "bg-sky-500 text-white"
                  : allDone
                    ? "bg-sky-100 text-sky-700"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Texto {idx + 1}
              {allDone && idx !== currentPassageIndex ? " ✓" : ""}
            </button>
          );
        })}
        <span className="ml-auto shrink-0 self-center text-xs text-slate-500">
          {answeredCount} de {totalQuestions} respondidas
        </span>
      </div>

      <div className="flex h-[calc(100vh-16rem)] flex-col gap-4 md:flex-row">
        {/* Left panel — passage text */}
        <Card className="flex flex-col overflow-hidden md:w-1/2">
          <div className="border-b border-slate-100 px-6 py-4">
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
              Texto {currentPassageIndex + 1} de {passages.length}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{currentPassage.title}</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {currentPassage.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-sm leading-relaxed text-slate-700 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        {/* Right panel — questions for this passage */}
        <Card className="flex flex-col overflow-hidden md:w-1/2">
          <div className="border-b border-slate-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
                Preguntas
              </span>
              <span className="text-xs text-slate-500">
                {passageAnsweredCount} de {currentPassage.questions.length} respondidas
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
            {currentPassage.questions.map((question, qIdx) => (
              <div key={question.key} className="space-y-3">
                <p className="text-sm font-medium text-slate-800">
                  <span className="text-slate-400">{question.order}.</span> {question.prompt}
                </p>
                <div className="space-y-2">
                  {shuffledOptionsMap[question.key].map((option, oIdx) => (
                    <McOptionCard
                      key={option.id}
                      option={option}
                      label={OPTION_LABELS[oIdx] ?? option.id}
                      isSelected={answers[question.key] === option.id}
                      onClick={() => handleSelect(question.key, option.id)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {errorMessage ? (
              <p className="text-sm text-rose-600">{errorMessage}</p>
            ) : null}

            <div className="flex items-center justify-between pb-2 pt-2">
              <Button
                variant="secondary"
                onClick={() => setCurrentPassageIndex((i) => i - 1)}
                disabled={isFirstPassage || isSubmitting}
              >
                Anterior
              </Button>

              {isLastPassage ? (
                <Button
                  onClick={() => doSubmit()}
                  disabled={!allAnswered || isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Finalizar y guardar"}
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentPassageIndex((i) => i + 1)}
                  disabled={isSubmitting}
                >
                  Siguiente texto
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
