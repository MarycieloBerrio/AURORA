"use client";

export type CellStatus = "idle" | "correct" | "incorrect" | "revealed" | "dimmed";

interface AttentionGridCellProps {
  char: string;
  status: CellStatus;
  onClick: () => void;
}

const STATUS_STYLES: Record<CellStatus, string> = {
  idle: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:scale-105 cursor-pointer",
  correct: "bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200 cursor-default",
  incorrect: "bg-rose-500 border-rose-500 text-white cursor-default",
  revealed: "bg-emerald-50 border-emerald-400 text-emerald-700 ring-2 ring-emerald-400 cursor-default",
  dimmed: "bg-slate-50 border-slate-100 text-slate-300 cursor-default",
};

export function AttentionGridCell({ char, status, onClick }: AttentionGridCellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status !== "idle"}
      aria-label={`Carácter ${char}`}
      className={`aspect-square w-full select-none rounded-md font-mono font-bold transition-all duration-200 ${STATUS_STYLES[status]}`}
    >
      {char}
    </button>
  );
}
