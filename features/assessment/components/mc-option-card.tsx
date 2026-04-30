"use client";

import type { AnswerOption } from "@/features/assessment/types";

interface McOptionCardProps {
  option: AnswerOption;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function McOptionCard({ option, label, isSelected, onClick }: McOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
        isSelected
          ? "border-sky-400 bg-sky-50 text-sky-900"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          isSelected ? "bg-sky-400 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        {label}
      </span>
      <div className="flex flex-col gap-2">
        <span>{option.text}</span>
        {option.imageSrc ? (
          <img
            src={option.imageSrc}
            alt={`Opción ${label}`}
            className="max-h-32 rounded-lg object-contain"
          />
        ) : null}
      </div>
    </button>
  );
}
