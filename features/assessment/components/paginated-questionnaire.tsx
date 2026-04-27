"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { LikertSlider, percentToLikert } from "@/features/assessment/components/likert-slider";
import type { QuestionView } from "@/features/assessment/types";

const QUESTIONS_PER_PAGE = 6;

interface PaginatedQuestionnaireProps {
  questions: QuestionView[];
  testId: string;
  accentColor: "blue" | "amber" | "emerald";
  testLabel: string;
}

export function PaginatedQuestionnaire({
  questions,
  testId,
  accentColor,
  testLabel,
}: PaginatedQuestionnaireProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
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

  const handleAnswer = (questionKey: string, value: number) => {
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
        value: percentToLikert(answers[q.key] ?? 50),
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

      router.push(`/app/floor/${testId}/completed`);
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
            accentColor === "blue"
              ? "bg-blue-100 text-blue-700"
              : accentColor === "amber"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {testLabel}
        </span>
      </div>

      {currentPage === 0 ? (
        <div className="mb-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-slate-600">
            Mueve el deslizador para indicar qué tan interesado estás en cada afirmación.
          </p>
        </div>
      ) : null}

      <div className="space-y-6">
        {currentQuestions.map((question, idx) => (
          <div key={question.key} className="space-y-3">
            <p className="text-sm font-medium text-slate-800 md:text-base">
              <span className="text-slate-400">{currentPage * QUESTIONS_PER_PAGE + idx + 1}.</span>{" "}
              {question.statement}
            </p>
            <LikertSlider
              value={answers[question.key]}
              onChange={(v) => handleAnswer(question.key, v)}
              accentColor={accentColor}
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
