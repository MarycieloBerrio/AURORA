import type { HTMLAttributes } from "react";

type BadgeVariant = "indigo" | "amber" | "emerald" | "slate" | "sky" | "violet" | "rose";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  indigo:  "bg-indigo-100 text-indigo-700 border-indigo-200",
  amber:   "bg-amber-100 text-amber-700 border-amber-200",
  emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  slate:   "bg-slate-100 text-slate-600 border-slate-200",
  sky:     "bg-sky-100 text-sky-700 border-sky-200",
  violet:  "bg-violet-100 text-violet-700 border-violet-200",
  rose:    "bg-rose-100 text-rose-700 border-rose-200",
};

export function Badge({ variant = "slate", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
