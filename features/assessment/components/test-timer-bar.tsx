"use client";

import { useTestTimer } from "@/features/assessment/hooks/use-test-timer";

interface TestTimerBarProps {
  startedAt: string;
  timeLimitSeconds: number;
  onTimeUp: () => void;
}

export function TestTimerBar({ startedAt, timeLimitSeconds, onTimeUp }: TestTimerBarProps) {
  const { progress, formattedTime, remainingSeconds } = useTestTimer({
    startedAt,
    timeLimitSeconds,
    onTimeUp,
  });

  const barColor =
    progress > 0.25
      ? "bg-emerald-500"
      : progress > 0.1
        ? "bg-amber-400"
        : "bg-rose-500";

  const badgeColor =
    progress > 0.25
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : progress > 0.1
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200 animate-pulse";

  return (
    <>
      {/* Progress bar at very top */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1.5 bg-slate-200">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Clock badge in top-right corner */}
      <div
        className={`fixed right-4 top-3 z-50 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${badgeColor}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
            clipRule="evenodd"
          />
        </svg>
        {formattedTime}
      </div>
    </>
  );
}
