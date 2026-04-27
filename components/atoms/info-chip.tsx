"use client";

import { useState, useRef, useEffect } from "react";

interface InfoChipProps {
  label: string;
  info: string;
}

export function InfoChip({ label, info }: InfoChipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border-b border-dotted border-current font-semibold cursor-pointer hover:opacity-80 transition-opacity"
      >
        {label}
      </button>
      {open && (
        <span className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-left text-xs leading-relaxed text-slate-700 shadow-xl">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-slate-200 bg-white" />
          {info}
        </span>
      )}
    </span>
  );
}
