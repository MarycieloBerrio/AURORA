"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { ImageGridOption } from "@/components/atoms/image-grid-option";
import { MatrixGrid } from "@/components/atoms/matrix-grid";
import { TextGridOption } from "@/components/atoms/text-grid-option";
import { TestTimerBar } from "@/features/assessment/components/test-timer-bar";
import { SkillTestIntro } from "@/features/assessment/components/skill-test-intro";
import type { AnswerOption, SkillQuestion } from "@/features/assessment/types";

const OPTION_LABELS = ["A", "B", "C", "D"];

interface ImageReasoningTestProps {
  questions: SkillQuestion[];
  testId: string;
  testLabel: string;
  timeLimitMinutes: number;
  activeSession?: { startedAt: string; timeLimitSeconds: number } | null;
}

type QuestionStatus = "unanswered" | "answered" | "pending";

function sumPoints(qs: SkillQuestion[]): number {
  return qs.reduce((sum, q) => sum + (q.points ?? 1), 0);
}

export function ImageReasoningTest({
  questions,
  testId,
  testLabel,
  timeLimitMinutes,
  activeSession,
}: ImageReasoningTestProps) {
  const router = useRouter();
  const [session, setSession] = useState(activeSession ?? null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const shuffledOptionsMap = useMemo<Record<string, AnswerOption[]>>(
    () =>
      Object.fromEntries(
        questions.map((q) => [q.key, [...q.options].sort(() => Math.random() - 0.5)]),
      ),
    [questions],
  );

  const currentQuestion = questions[currentIndex];
  const currentOptions = shuffledOptionsMap[currentQuestion.key] ?? currentQuestion.options;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const isPending = pending.has(currentQuestion.key);

  const getStatus = useCallback(
    (key: string): QuestionStatus => {
      if (pending.has(key)) return "pending";
      if (answers[key] !== undefined) return "answered";
      return "unanswered";
    },
    [answers, pending],
  );

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.key]: optionId }));
    setErrorMessage("");
  };

  const togglePending = () => {
    setPending((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.key)) {
        next.delete(currentQuestion.key);
      } else {
        next.add(currentQuestion.key);
      }
      return next;
    });
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setErrorMessage("");
  };

  const doSubmit = useCallback(
    async (force?: boolean) => {
      if (submittedRef.current) return;
      if (!force && answeredCount < questions.length) {
        setErrorMessage("Debes responder todas las preguntas antes de finalizar.");
        return;
      }

      submittedRef.current = true;
      setIsSubmitting(true);
      setErrorMessage("");

      const correctQuestions = questions.filter((q) => answers[q.key] === q.correctOptionId);
      const points = correctQuestions.reduce((sum, q) => sum + (q.points ?? 1), 0);
      const max = sumPoints(questions);

      try {
        const response = await fetch(`/api/assessment/${testId}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ max, points }),
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
    [answeredCount, answers, questions, router, testId],
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

  return (
    <>
      <TestTimerBar
        startedAt={session.startedAt}
        timeLimitSeconds={session.timeLimitSeconds}
        onTimeUp={handleTimeUp}
      />

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Mobile navigator */}
        <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 lg:hidden">
          {questions.map((q, idx) => {
            const status = getStatus(q.key);
            return (
              <button
                key={q.key}
                type="button"
                onClick={() => goTo(idx)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition ${
                  idx === currentIndex ? "ring-2 ring-emerald-600 ring-offset-1" : ""
                } ${
                  status === "answered"
                    ? "bg-emerald-500 text-white"
                    : status === "pending"
                      ? "bg-amber-400 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Main question area */}
        <Card className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Pregunta {currentIndex + 1} de {questions.length}
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              {testLabel}
            </span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left panel — prompt + matrix or image */}
            <div className="flex flex-col gap-4 lg:w-[55%]">
              <p className="text-sm font-medium leading-relaxed text-slate-800">
                {currentQuestion.prompt}
              </p>
              {currentQuestion.matrixCells ? (
                <MatrixGrid cells={currentQuestion.matrixCells} />
              ) : currentQuestion.promptImageSrc ? (
                <img
                  src={currentQuestion.promptImageSrc}
                  alt={`Imagen de la pregunta ${currentIndex + 1}`}
                  className="max-h-56 w-full rounded-xl object-contain lg:max-h-80"
                />
              ) : null}
            </div>

            {/* Right panel — 2×2 options grid */}
            <div className="flex flex-col gap-4 lg:w-[45%]">
              <div className="grid grid-cols-2 gap-3">
                {currentOptions.map((option, oIdx) => {
                  const label = OPTION_LABELS[oIdx] ?? option.id;
                  const isSelected = answers[currentQuestion.key] === option.id;
                  return option.imageSrc ? (
                    <ImageGridOption
                      key={option.id}
                      imageSrc={option.imageSrc}
                      label={label}
                      isSelected={isSelected}
                      onClick={() => handleSelect(option.id)}
                    />
                  ) : (
                    <TextGridOption
                      key={option.id}
                      text={option.text}
                      label={label}
                      isSelected={isSelected}
                      onClick={() => handleSelect(option.id)}
                    />
                  );
                })}
              </div>

              {/* Mark as pending */}
              <button
                type="button"
                onClick={togglePending}
                className={`inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isPending
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M10 2a.75.75 0 0 1 .75.75v5.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0L6.2 7.26a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2Z" />
                  <path d="M5.273 4.5a1.25 1.25 0 0 0-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 0 1 .894.553l.448.894a1 1 0 0 0 .894.553h3.438a1 1 0 0 0 .86-.49l.606-1.02A1 1 0 0 1 14 11h3.47a1.318 1.318 0 0 0-.015-.062l-1.523-5.52a1.25 1.25 0 0 0-1.205-.918h-9.454Z" />
                </svg>
                {isPending ? "Marcada como pendiente" : "Marcar como pendiente"}
              </button>

              {errorMessage ? (
                <p className="text-sm text-rose-600">{errorMessage}</p>
              ) : null}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="secondary"
                  onClick={() => goTo(currentIndex - 1)}
                  disabled={isFirst || isSubmitting}
                >
                  Anterior
                </Button>

                {isLast ? (
                  <Button
                    onClick={() => doSubmit()}
                    disabled={answeredCount < questions.length || isSubmitting}
                  >
                    {isSubmitting ? "Guardando..." : "Finalizar y guardar"}
                  </Button>
                ) : (
                  <Button onClick={() => goTo(currentIndex + 1)} disabled={isSubmitting}>
                    Siguiente
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Desktop navigator panel */}
        <Card className="hidden w-64 shrink-0 p-5 lg:block">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Navegador de preguntas</h3>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const status = getStatus(q.key);
              return (
                <button
                  key={q.key}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition ${
                    idx === currentIndex ? "ring-2 ring-emerald-600 ring-offset-1" : ""
                  } ${
                    status === "answered"
                      ? "bg-emerald-500 text-white"
                      : status === "pending"
                        ? "bg-amber-400 text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block h-3 w-3 rounded bg-slate-200" />
              Sin responder
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block h-3 w-3 rounded bg-emerald-500" />
              Respondida
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block h-3 w-3 rounded bg-amber-400" />
              Pendiente
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-center">
            <p className="text-xs text-slate-500">
              Respondidas: <span className="font-semibold text-slate-700">{answeredCount}</span> /{" "}
              {questions.length}
            </p>
          </div>

          <Button
            onClick={() => doSubmit()}
            disabled={answeredCount < questions.length || isSubmitting}
            className="mt-4 w-full"
          >
            {isSubmitting ? "Guardando..." : "Finalizar"}
          </Button>
        </Card>
      </div>
    </>
  );
}
