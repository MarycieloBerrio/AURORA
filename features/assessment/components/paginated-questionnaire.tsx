"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { LikertCardRow } from "@/features/assessment/components/likert-card-row";
import type { LikertScaleLabels, LikertValue } from "@/types/test-results";
import type { QuestionView } from "@/features/assessment/types";

const QUESTIONS_PER_PAGE = 6;

interface PaginatedQuestionnaireProps {
  questions: QuestionView[];
  testId: string;
  floorId: string;
  accentColor: "indigo" | "amber" | "emerald";
  testLabel: string;
  scaleLabels: LikertScaleLabels;
}

export function PaginatedQuestionnaire({
  questions,
  testId,
  floorId,
  accentColor,
  testLabel,
  scaleLabels,
}: PaginatedQuestionnaireProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LikertValue>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pages = useMemo(() => {
    const result: QuestionView[][] = [];
    for (let i = 0; i < questions.length; i += QUESTIONS_PER_PAGE) {
      result.push(questions.slice(i, i + QUESTIONS_PER_PAGE));
    }
    return result;
  }, [questions]);

  const totalPages = pages.length;
  const currentQuestions = pages[currentPage];
  const isLastPage = currentPage === totalPages - 1;

  const pageFullyAnswered = currentQuestions.every((q) => answers[q.key] !== undefined);
  const allAnswered = useMemo(
    () => questions.every((q) => answers[q.key] !== undefined),
    [answers, questions],
  );

  const handleAnswer = (questionKey: string, value: LikertValue) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
    setErrorMessage("");
  };

  const goToPrevious = () => {
    setErrorMessage("");
    setCurrentPage((p) => Math.max(0, p - 1));
  };

  const goToNext = () => {
    if (!pageFullyAnswered) {
      setErrorMessage("Responde todas las preguntas de esta página para continuar.");
      return;
    }
    setErrorMessage("");
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
  };

  const handleSubmit = async () => {
    if (!allAnswered) {
      setErrorMessage("Debes responder todas las preguntas antes de finalizar.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const payload = {
      responses: questions.map((q) => ({
        questionKey: q.key,
        value: answers[q.key],
      })),
    };

    try {
      const response = await fetch(`/api/assessment/${testId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const parsed = (await response.json()) as { message?: string };
        setErrorMessage(parsed.message ?? "No se pudieron guardar las respuestas.");
        setIsSubmitting(false);
        return;
      }

      router.push(`/app/floor/${floorId}/test/${testId}/completed`);
      router.refresh();
    } catch {
      setErrorMessage("Hubo un problema de conexión. Inténtalo nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-3xl p-4 sm:p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Página {currentPage + 1} de {totalPages}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            accentColor === "indigo"
              ? "bg-indigo-100 text-indigo-700"
              : accentColor === "amber"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {testLabel}
        </span>
      </div>

      <div className="space-y-6">
        {currentQuestions.map((question, idx) => (
          <div key={question.key} className="space-y-2">
            <p className="text-sm font-medium text-slate-800 md:text-base">
              <span className="text-slate-400">{currentPage * QUESTIONS_PER_PAGE + idx + 1}.</span>{" "}
              {question.statement}
            </p>
            <LikertCardRow
              value={answers[question.key]}
              onChange={(v) => handleAnswer(question.key, v)}
              accentColor={accentColor}
              scaleLabels={scaleLabels}
            />
          </div>
        ))}
      </div>

      {errorMessage ? (
        <p className="mt-4 text-sm text-rose-600">{errorMessage}</p>
      ) : null}

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={goToPrevious}
          disabled={currentPage === 0 || isSubmitting}
        >
          Anterior
        </Button>

        {isLastPage ? (
          <Button onClick={handleSubmit} disabled={!pageFullyAnswered || isSubmitting}>
            {isSubmitting ? "Guardando..." : "Finalizar y guardar"}
          </Button>
        ) : (
          <Button onClick={goToNext} disabled={!pageFullyAnswered || isSubmitting}>
            Siguiente
          </Button>
        )}
      </div>
    </Card>
  );
}
