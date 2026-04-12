"use client";

import { createPortal } from "react-dom";

interface FloatingTooltipProps {
  x: number;
  y: number;
  label: string;
  value: string;
  color: string;
}

export function FloatingTooltip({ x, y, label, value, color }: FloatingTooltipProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        left: x,
        top: y - 10,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      className="rounded-lg border border-slate-100 bg-white px-2.5 py-1.5 shadow-lg"
    >
      <p className="whitespace-nowrap text-center text-xs text-slate-500">{label}</p>
      <p className="whitespace-nowrap text-center text-sm font-bold" style={{ color }}>{value}</p>
    </div>,
    document.body,
  );
}
