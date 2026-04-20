"use client";

interface TextGridOptionProps {
  text: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TextGridOption({ text, label, isSelected, onClick }: TextGridOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex aspect-square w-full items-center justify-center rounded-xl border-2 transition ${
        isSelected
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span
        className={`absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          isSelected ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        {label}
      </span>
      <span className="text-xl font-bold text-slate-800">{text}</span>
    </button>
  );
}
