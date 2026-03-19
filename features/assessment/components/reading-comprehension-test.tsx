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
  passage: ReadingPassage;
  testId: string;
  floorId: string;
  testLabel: string;
  timeLimitMinutes: number;
  activeSession?: { startedAt: string; timeLimitSeconds: number } | null;
}

export function ReadingComprehensionTest({
  passage,
  testId,
  floorId,
  testLabel,
  timeLimitMinutes,
  activeSession,
}: ReadingComprehensionTestProps) {
  const router = useRouter();
  const [session, setSession] = useState(activeSession ?? null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = passage.questions.length;
  const allAnswered = answeredCount === totalQuestions;

  const points = useMemo(() => {
    return passage.questions.filter((q) => answers[q.key] === q.correctOptionId).length;
  }, [answers, passage.questions]);

  const handleSelect = (questionKey: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: optionId }));
    setErrorMessage("");
  };

  const doSubmit = useCallback(async (force?: boolean) => {
    if (submittedRef.current) return;
    if (!force && !allAnswered) {
      setErrorMessage("Debes responder todas las preguntas antes de finalizar.");
      return;
    }

    submittedRef.current = true;
    setIsSubmitting(true);
    setErrorMessage("");

    // Calculate current points at submission time
    const currentPoints = passage.questions.filter(
      (q) => answers[q.key] === q.correctOptionId,
    ).length;

    try {
      const response = await fetch(`/api/assessment/${testId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ max: totalQuestions, points: currentPoints }),
      });

      if (!response.ok) {
        const parsed = (await response.json()) as { message?: string };
        setErrorMessage(parsed.message ?? "No se pudieron guardar las respuestas.");
        setIsSubmitting(false);
        submittedRef.current = false;
        return;
      }

      router.push(`/app/floor/${floorId}/test/${testId}/completed`);
      router.refresh();
    } catch {
      setErrorMessage("Hubo un problema de conexión. Inténtalo nuevamente.");
      setIsSubmitting(false);
      submittedRef.current = false;
    }
  }, [allAnswered, answers, floorId, passage.questions, router, testId, totalQuestions]);

  const handleTimeUp = useCallback(() => {
    doSubmit(true);
  }, [doSubmit]);

  // Show intro screen if no active session
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

  return (
    <>
      <TestTimerBar
        startedAt={session.startedAt}
        timeLimitSeconds={session.timeLimitSeconds}
        onTimeUp={handleTimeUp}
      />

      <div className="flex h-[calc(100vh-14rem)] flex-col gap-4 md:flex-row">
        {/* Left panel — Reading passage */}
        <Card className="flex flex-col overflow-hidden md:w-1/2">
          <div className="border-b border-slate-100 px-6 py-4">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              Texto de lectura
            </span>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{passage.title}</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {passage.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-sm leading-relaxed text-slate-700 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        {/* Right panel — Questions */}
        <Card className="flex flex-col overflow-hidden md:w-1/2">
          <div className="border-b border-slate-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                Preguntas
              </span>
              <span className="text-xs text-slate-500">
                {answeredCount} de {totalQuestions} respondidas
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
            {passage.questions.map((question, qIdx) => (
              <div key={question.key} className="space-y-3">
                <p className="text-sm font-medium text-slate-800">
                  <span className="text-slate-400">{qIdx + 1}.</span> {question.prompt}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, oIdx) => (
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

            <div className="pb-2 pt-2">
              <Button
                onClick={() => doSubmit()}
                disabled={!allAnswered || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Guardando..." : "Finalizar y guardar"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
