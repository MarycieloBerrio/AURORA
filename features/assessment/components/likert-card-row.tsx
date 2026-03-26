"use client";

import type { LikertScaleLabels, LikertValue } from "@/types/test-results";

const SCALE_POINTS = [
  { value: 5 as LikertValue, sizePx: 46, side: "positive" },
  { value: 4 as LikertValue, sizePx: 36, side: "positive" },
  { value: 3 as LikertValue, sizePx: 24, side: "neutral" },
  { value: 2 as LikertValue, sizePx: 36, side: "negative" },
  { value: 1 as LikertValue, sizePx: 46, side: "negative" },
] as const;

const accentThemes = {
  indigo: {
    positive: {
      idle: "border-indigo-400 hover:bg-indigo-50",
      selected: "border-indigo-600 bg-indigo-600",
    },
    negative: {
      idle: "border-rose-300 hover:bg-rose-50",
      selected: "border-rose-500 bg-rose-500",
    },
    positiveLabelColor: "text-indigo-700",
    negativeLabelColor: "text-rose-600",
  },
  amber: {
    positive: {
      idle: "border-amber-400 hover:bg-amber-50",
      selected: "border-amber-500 bg-amber-500",
    },
    negative: {
      idle: "border-sky-300 hover:bg-sky-50",
      selected: "border-sky-500 bg-sky-500",
    },
    positiveLabelColor: "text-amber-700",
    negativeLabelColor: "text-sky-600",
  },
  emerald: {
    positive: {
      idle: "border-emerald-400 hover:bg-emerald-50",
      selected: "border-emerald-600 bg-emerald-600",
    },
    negative: {
      idle: "border-rose-300 hover:bg-rose-50",
      selected: "border-rose-500 bg-rose-500",
    },
    positiveLabelColor: "text-emerald-700",
    negativeLabelColor: "text-rose-600",
  },
} as const;

const neutralStyles = {
  idle: "border-slate-300 hover:bg-slate-50",
  selected: "border-slate-500 bg-slate-400",
};

interface LikertCardRowProps {
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
  accentColor: "indigo" | "amber" | "emerald";
  scaleLabels: LikertScaleLabels;
}

export function LikertCardRow({ value, onChange, accentColor, scaleLabels }: LikertCardRowProps) {
  const theme = accentThemes[accentColor];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span className={`w-20 shrink-0 text-right text-xs font-medium sm:w-24 sm:text-sm ${theme.positiveLabelColor}`}>
        {scaleLabels[5]}
      </span>

      <div className="flex flex-1 items-center justify-between">
        {SCALE_POINTS.map((point) => {
          const isSelected = value === point.value;
          const styles =
            point.side === "positive"
              ? theme.positive
              : point.side === "neutral"
                ? neutralStyles
                : theme.negative;

          return (
            <button
              key={point.value}
              type="button"
              onClick={() => onChange(point.value)}
              style={{ width: point.sizePx, height: point.sizePx }}
              className={`shrink-0 rounded-full border-2 transition-all ${
                isSelected ? styles.selected : `bg-white ${styles.idle}`
              }`}
              aria-label={scaleLabels[point.value]}
            />
          );
        })}
      </div>

      <span className={`w-20 shrink-0 text-left text-xs font-medium sm:w-24 sm:text-sm ${theme.negativeLabelColor}`}>
        {scaleLabels[1]}
      </span>
    </div>
  );
}
