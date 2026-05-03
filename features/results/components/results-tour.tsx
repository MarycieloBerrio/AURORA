"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STORAGE_KEY = "aurora-results-tour-v1";

function storageGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

type TourStep = {
  message: string;
  showArrow: boolean;
  arrowLabel?: string;
  tourTarget?: string;
};

const TOUR_STEPS: TourStep[] = [
  {
    message:
      "Estos son tus resultados básicos. Recuerda que cuantos más tests completes, más precisas serán tus recomendaciones. ¡Exploremos juntos!",
    showArrow: false,
  },
  {
    message:
      "RIASEC mide tus intereses vocacionales en 6 dimensiones: Realista (trabajo práctico), Investigativo (ciencia y análisis), Artístico (creatividad), Social (ayudar a otros), Emprendedor (liderazgo) y Convencional (organización y datos).",
    showArrow: true,
    arrowLabel: "Ver perfil detallado",
    tourTarget: "riasec",
  },
  {
    message:
      "HEXACO evalúa tu personalidad en 6 rasgos: Honestidad-Humildad, Emocionalidad, Extroversión, Amabilidad, Conciencia y Apertura a la experiencia.",
    showArrow: true,
    arrowLabel: "Ver perfil detallado",
    tourTarget: "hexaco",
  },
  {
    message:
      "Las aptitudes miden tus habilidades cognitivas: Comprensión lectora, Razonamiento deductivo e inductivo, Matemático, Espacial y Atención selectiva.",
    showArrow: true,
    arrowLabel: "Ver perfil detallado",
    tourTarget: "aptitude",
  },
  {
    message:
      "¡Aquí están tus carreras recomendadas! Filtra por nivel académico (Profesional o Tecnología). Selecciona hasta 3 carreras para comparar su perfil ideal con el tuyo en las gráficas. Y usa la 🔍 para ver dónde estudiarla en Colombia.",
    showArrow: false,
    tourTarget: "careers",
  },
];

function clearHighlights() {
  document.querySelectorAll("[data-tour]").forEach((el) => {
    el.classList.remove("tour-highlight");
  });
}

export function ResultsTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!storageGet(STORAGE_KEY)) {
      setStep(1);
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible || step === 0) return;

    clearHighlights();

    const current = TOUR_STEPS[step - 1];
    if (current?.tourTarget) {
      const el = document.querySelector(`[data-tour="${current.tourTarget}"]`);
      if (el) {
        el.classList.add("tour-highlight");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    return () => {
      clearHighlights();
    };
  }, [step, visible]);

  if (!visible || step === 0) return null;

  const currentStep = TOUR_STEPS[step - 1];
  const isLast = step === TOUR_STEPS.length;

  function advance() {
    if (!isLast) {
      setStep((s) => s + 1);
    } else {
      finish();
    }
  }

  function finish() {
    storageSet(STORAGE_KEY, "1");
    clearHighlights();
    setVisible(false);
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-[45] -translate-x-1/2 w-full max-w-sm px-4 md:max-w-md animate-fade-in">
      {/* Arrow indicator for steps 2–4 */}
      {currentStep.showArrow && (
        <div className="mb-2 flex justify-center animate-bounce-y">
          <span className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
              <path fillRule="evenodd" d="M7.25 14a.75.75 0 0 0 1.5 0V5.31l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22V14Z" clipRule="evenodd" />
            </svg>
            {currentStep.arrowLabel}
          </span>
        </div>
      )}

      {/* Tour card */}
      <div className="flex items-end gap-3 rounded-2xl border border-indigo-100 bg-white p-4 shadow-xl">
        {/* Aurora avatar */}
        <div className="relative h-20 w-10 shrink-0 self-end">
          <Image
            src="/assets/aurora-guide.png"
            alt="Aurora"
            fill
            className="object-contain drop-shadow"
            sizes="40px"
          />
        </div>

        {/* Message + navigation */}
        <div className="flex-1 space-y-3">
          <p className="text-xs leading-relaxed text-slate-700">{currentStep.message}</p>

          <div className="flex items-center justify-between">
            {/* Step dots */}
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i + 1 === step ? "w-4 bg-indigo-600" : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            {/* Action button */}
            <button
              onClick={advance}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              {isLast ? "Finalizar" : "Siguiente →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
