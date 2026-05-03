"use client";

import type { CSSProperties } from "react";
import type { AttentionCellContent } from "@/features/assessment/types";

export type CellStatus = "idle" | "correct" | "incorrect" | "revealed" | "dimmed";

interface AttentionGridCellProps {
  content: AttentionCellContent;
  status: CellStatus;
  onClick: () => void;
}

const STATUS_STYLES: Record<CellStatus, string> = {
  idle:      "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:scale-105 cursor-pointer",
  correct:   "bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200 cursor-default",
  incorrect: "bg-rose-500 border-rose-500 text-white cursor-default",
  revealed:  "bg-emerald-50 border-emerald-400 text-emerald-700 ring-2 ring-emerald-400 cursor-default",
  dimmed:    "bg-slate-50 border-slate-100 text-slate-300 cursor-default",
};

const MONO_ZERO_STYLE: CSSProperties = {
  fontFamily: "Consolas, 'Courier New', monospace",
  fontVariantNumeric: "slashed-zero",
};

function renderTextContent(content: Extract<AttentionCellContent, { type: "text" }>) {
  const cls = `absolute inset-0 flex items-center justify-center${content.italic ? " italic" : ""}`;

  if (!content.monoZero) {
    return <span className={cls}>{content.value}</span>;
  }

  return (
    <span className={cls}>
      {content.value.split("").map((char, i) =>
        char === "0"
          ? <span key={i} style={MONO_ZERO_STYLE}>{char}</span>
          : char,
      )}
    </span>
  );
}

export function AttentionGridCell({ content, status, onClick }: AttentionGridCellProps) {
  const label = content.type === "text" ? `Elemento ${content.value}` : content.alt;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status !== "idle"}
      aria-label={label}
      className={`relative aspect-square w-full select-none overflow-hidden rounded-md font-mono font-bold transition-all duration-200 ${STATUS_STYLES[status]}`}
    >
      {content.type === "image" ? (
        <img
          src={content.src}
          alt={content.alt}
          className="absolute inset-1 object-contain"
          style={{ width: "calc(100% - 8px)", height: "calc(100% - 8px)" }}
          draggable={false}
        />
      ) : (
        renderTextContent(content)
      )}
    </button>
  );
}
