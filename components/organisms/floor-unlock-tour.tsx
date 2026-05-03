"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SpeechBubble } from "@/components/atoms/speech-bubble";

const STORAGE_KEY = "aurora-unlock-tour-v1";

function storageGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

interface FloorUnlockTourProps {
  canViewResults: boolean;
}

export function FloorUnlockTour({ canViewResults }: FloorUnlockTourProps) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!canViewResults) return;
    if (!storageGet(STORAGE_KEY)) setVisible(true);
  }, [canViewResults]);

  if (!visible) return null;

  function dismiss() {
    storageSet(STORAGE_KEY, "1");
    setVisible(false);
  }

  function goToResults() {
    storageSet(STORAGE_KEY, "1");
    router.push("/app/results");
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center backdrop-blur-md bg-black/40 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Tus resultados están listos"
    >
      {/* Close button */}
      <button
        onClick={dismiss}
        aria-label="Cerrar"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 text-lg font-semibold"
      >
        ×
      </button>

      {/* Arrow pointing toward top-right header button */}
      <div className="absolute right-12 top-14 md:right-20 animate-bounce-y">
        <div className="flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M8.75 2a.75.75 0 0 0-1.5 0v8.69L5.03 8.47a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 1 0-1.06-1.06L8.75 10.69V2Z" clipRule="evenodd" transform="rotate(135 8 8)" />
          </svg>
          Ver resultados
        </div>
      </div>

      {/* Main content: Aurora (left) + speech (right) side-by-side, matching floor guide pattern */}
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="flex items-end gap-4">
          {/* Aurora full-body */}
          <div className="relative h-[200px] w-[100px] md:h-[300px] md:w-[150px] shrink-0 drop-shadow-2xl">
            <Image
              src="/assets/aurora-guide.png"
              alt="Aurora"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100px, 150px"
            />
          </div>

          {/* Speech bubble — tail points left toward Aurora */}
          <SpeechBubble tail="left" className="max-w-[200px] md:max-w-xs animate-slide-in mb-4">
            <p className="text-sm font-semibold text-slate-800">¡Tus resultados básicos ya están disponibles!</p>
            <p className="mt-1 text-xs text-slate-600">
              Para una recomendación más precisa completa más pruebas, ¡pero ya puedes ver tu primer perfil vocacional!
            </p>
          </SpeechBubble>
        </div>

        {/* CTA */}
        <button
          onClick={goToResults}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 animate-slide-in"
        >
          Ver resultados →
        </button>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="text-xs text-white/70 underline hover:text-white transition"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}
