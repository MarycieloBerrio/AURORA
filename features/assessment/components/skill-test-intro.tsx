"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import {
  TEST_ID_SPATIAL_REASONING,
  TEST_ID_INDUCTIVE_REASONING,
  TEST_ID_DEDUCTIVE_REASONING,
  TEST_ID_SELECTIVE_ATTENTION,
} from "@/constants/assessment-tests";

interface SkillTestIntroProps {
  testLabel: string;
  testId: string;
  timeLimitMinutes: number;
  onStart: (session: { startedAt: string; timeLimitSeconds: number }) => void;
}

const TEST_INFO: Record<string, { description: string; tips: string[] }> = {
  "reading-comprehension": {
    description:
      "En esta prueba se te presentará un texto de lectura y una serie de preguntas de comprensión. Deberás leer atentamente el texto y seleccionar la respuesta correcta para cada pregunta.",
    tips: [
      "Busca un lugar tranquilo y sin distracciones",
      "Lee el texto completo antes de responder las preguntas",
      "Puedes volver al texto en cualquier momento mientras respondes",
      "No te detengas demasiado en una sola pregunta, avanza y regresa después",
    ],
  },
  "mathematical-reasoning": {
    description:
      "En esta prueba resolverás problemas de razonamiento lógico y matemático. Cada pregunta puede incluir texto e imágenes en su enunciado y en las opciones de respuesta.",
    tips: [
      "Busca un lugar tranquilo y sin distracciones",
      "Ten papel y lápiz a la mano para hacer cálculos",
      "Lee cada enunciado con atención antes de responder",
      "Puedes marcar preguntas como pendientes para revisarlas después",
      "Usa el navegador de preguntas para moverte entre ellas",
    ],
  },
  [TEST_ID_SPATIAL_REASONING]: {
    description:
      "En esta prueba se te presentará una figura isométrica y deberás identificar cuál de las opciones corresponde a una rotación de esa misma figura en el espacio tridimensional.",
    tips: [
      "Busca un lugar tranquilo y sin distracciones",
      "Observa la imagen con detenimiento antes de elegir",
      "Analiza la forma, orientación y proporciones de cada figura",
      "Puedes marcar preguntas como pendientes para revisarlas después",
      "Usa el navegador de preguntas para moverte entre ellas",
    ],
  },
  [TEST_ID_INDUCTIVE_REASONING]: {
    description:
      "En esta prueba de Matrices de Raven evaluarás tu capacidad de razonamiento inductivo. Se te presentará una matriz con un patrón visual incompleto y deberás identificar cuál de las opciones completa correctamente el patrón.",
    tips: [
      "Busca un lugar tranquilo y sin distracciones",
      "Analiza los patrones de filas y columnas antes de responder",
      "Observa los cambios en forma, tamaño, cantidad y orientación",
      "Puedes marcar preguntas como pendientes para revisarlas después",
      "Usa el navegador de preguntas para moverte entre ellas",
    ],
  },
  [TEST_ID_DEDUCTIVE_REASONING]: {
    description:
      "En esta prueba evaluarás tu capacidad de razonamiento deductivo. Se te presentará una figura con una premisa lógica y deberás seleccionar la conclusión que se deriva de ella de forma válida.",
    tips: [
      "Busca un lugar tranquilo y sin distracciones",
      "Lee o analiza cada figura con atención antes de elegir",
      "Descarta las opciones que contradigan las premisas",
      "Puedes marcar preguntas como pendientes para revisarlas después",
      "Usa el navegador de preguntas para moverte entre ellas",
    ],
  },
  [TEST_ID_SELECTIVE_ATTENTION]: {
    description:
      "En esta prueba evaluarás tu atención visual. Verás una matriz de caracteres en la que uno de ellos es diferente al resto. Pulsa ese carácter lo más rápido que puedas.",
    tips: [
      "Busca un lugar tranquilo y sin distracciones",
      "Escanea la matriz de forma sistemática, fila por fila",
      "Las matrices aumentan de tamaño con cada pregunta",
      "Al pulsar un carácter pasarás automáticamente a la siguiente pregunta",
    ],
  },
};

const DEFAULT_INFO = {
  description: "Esta es una prueba de aptitud cronometrada. Responde las preguntas con atención.",
  tips: [
    "Busca un lugar tranquilo y sin distracciones",
    "Ten papel y lápiz a la mano",
    "Lee cada pregunta con atención",
  ],
};

export function SkillTestIntro({
  testLabel,
  testId,
  timeLimitMinutes,
  onStart,
}: SkillTestIntroProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");

  const info = TEST_INFO[testId] ?? DEFAULT_INFO;

  const handleStart = async () => {
    setIsStarting(true);
    setError("");

    try {
      const response = await fetch(`/api/assessment/${testId}/start`, {
        method: "POST",
      });

      if (!response.ok) {
        const parsed = (await response.json()) as { message?: string };
        setError(parsed.message ?? "No se pudo iniciar la prueba.");
        setIsStarting(false);
        return;
      }

      const data = (await response.json()) as { startedAt: string; timeLimitSeconds: number };
      onStart(data);
    } catch {
      setError("Hubo un problema de conexión. Inténtalo nuevamente.");
      setIsStarting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl p-6 sm:p-8">
      {/* Aurora avatar + greeting */}
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-indigo-600"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{testLabel}</h2>
          <p className="mt-1 text-sm text-slate-600">{info.description}</p>
        </div>
      </div>

      {/* Tips */}
      <div className="mb-6 rounded-xl bg-slate-50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-700">Antes de comenzar:</h3>
        <ul className="space-y-2">
          {info.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Time limit warning */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5 shrink-0 text-amber-600"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <p className="text-sm font-semibold text-amber-800">
            Tiempo límite: {timeLimitMinutes} minutos
          </p>
          <p className="text-xs text-amber-700">
            El temporizador comenzará cuando presiones el botón &quot;Empezar prueba&quot;. Si el
            tiempo se agota, tus respuestas se enviarán automáticamente.
          </p>
        </div>
      </div>

      {error ? <p className="mb-4 text-sm text-rose-600">{error}</p> : null}

      {/* Start button */}
      <Button onClick={handleStart} disabled={isStarting} className="w-full">
        {isStarting ? "Iniciando..." : "Empezar prueba"}
      </Button>
    </Card>
  );
}
