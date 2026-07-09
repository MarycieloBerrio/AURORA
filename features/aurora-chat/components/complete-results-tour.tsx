"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SpeechBubble } from "@/components/atoms/speech-bubble";
import { AURORA_CHAT_COPY, AURORA_CHAT_STORAGE_KEYS } from "@/features/aurora-chat/constants";

function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

interface CompleteResultsTourProps {
  enabled: boolean;
}

export function CompleteResultsTour({ enabled }: CompleteResultsTourProps) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || storageGet(AURORA_CHAT_STORAGE_KEYS.completeTour)) return;

    const timeoutId = window.setTimeout(() => {
      setStep(0);
      setVisible(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [enabled]);

  if (!enabled || !visible) return null;

  const isLast = step === AURORA_CHAT_COPY.completeTourSteps.length - 1;

  function finish() {
    storageSet(AURORA_CHAT_STORAGE_KEYS.completeTour, "1");
    setVisible(false);
  }

  function advance() {
    if (isLast) {
      finish();
      return;
    }
    setStep((current) => current + 1);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 px-4 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={AURORA_CHAT_COPY.completeTourLabel}
    >
      <div className="flex w-full max-w-xl items-end justify-center gap-4 animate-slide-in">
        <div className="relative h-52 w-28 shrink-0 drop-shadow-2xl md:h-72 md:w-36">
          <Image
            src="/assets/aurora-guide.png"
            alt="Aurora"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 112px, 144px"
            priority
          />
        </div>

        <SpeechBubble tail="left" className="mb-7 max-w-xs md:max-w-sm">
          <p className="text-sm font-semibold leading-relaxed text-slate-800">
            {AURORA_CHAT_COPY.completeTourSteps[step]}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {AURORA_CHAT_COPY.completeTourSteps.map((message) => (
                <span
                  key={message}
                  className={`h-1.5 rounded-full transition-all ${
                    message === AURORA_CHAT_COPY.completeTourSteps[step] ? "w-5 bg-indigo-600" : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={advance}
              className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              {isLast ? AURORA_CHAT_COPY.understood : AURORA_CHAT_COPY.next}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </SpeechBubble>
      </div>
    </div>
  );
}
