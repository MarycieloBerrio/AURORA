"use client";

import { LIKERT_LABELS, LIKERT_OPTIONS, type LikertValue } from "@/types/test-results";

const accentStyles = {
  indigo: {
    selected: "border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-200",
    hover: "hover:border-indigo-400 hover:bg-indigo-50",
  },
  amber: {
    selected: "border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-200",
    hover: "hover:border-amber-400 hover:bg-amber-50",
  },
  emerald: {
    selected: "border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-200",
    hover: "hover:border-emerald-400 hover:bg-emerald-50",
  },
} as const;

interface LikertCardRowProps {
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
  accentColor: "indigo" | "amber" | "emerald";
}

export function LikertCardRow({ value, onChange, accentColor }: LikertCardRowProps) {
  const styles = accentStyles[accentColor];

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
      {LIKERT_OPTIONS.map((option) => {
        const isSelected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-lg border-2 px-1 py-2 text-center text-[10px] font-medium transition-all sm:px-2 sm:py-2.5 sm:text-xs md:text-sm ${
              isSelected
                ? styles.selected
                : `border-slate-200 bg-white text-slate-600 ${styles.hover}`
            }`}
          >
            {LIKERT_LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
