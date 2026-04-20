"use client";

import type React from "react";

/**
 * Unicode geometric symbols have very different visual weights at the same font-size.
 * These sizes are calibrated so •, ▲, ■ and ♦ appear roughly the same visual height
 * inside the answer option cards.
 */
const SINGLE_SYMBOL_SIZE: Record<string, string> = {
  "•": "3.2rem",  // bullet is inherently tiny — needs ~2× the size of a square
  "▲": "2.2rem",  // triangle slightly smaller than square visually
  "■": "1.7rem",  // square fills its bounding box completely — keep it smaller
  "♦": "2.4rem",  // diamond sits between bullet and square
};

function textStyle(text: string): React.CSSProperties {
  const fontSize = SINGLE_SYMBOL_SIZE[text];
  return fontSize ? { fontSize } : {};
}

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
      <span style={textStyle(text)} className="text-xl font-bold text-slate-800">
        {text}
      </span>
    </button>
  );
}
