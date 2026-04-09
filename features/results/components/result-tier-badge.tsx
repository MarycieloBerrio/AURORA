import type { ResultTier } from "@/features/results/lib/result-tier";

interface TierStyle {
  label: string;
  hint: string;
  bg: string;
  border: string;
  text: string;
  dot: string;
}

const TIER_STYLES: Record<ResultTier, TierStyle> = {
  minimum: {
    label: "Resultados basicos",
    hint: "Completa mas modulos para mayor precision",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  intermediate: {
    label: "Resultados intermedios",
    hint: "Buen nivel de confianza",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    dot: "bg-indigo-400",
  },
  complete: {
    label: "Resultados completos",
    hint: "Maxima precision",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
};

interface ResultTierBadgeProps {
  tier: ResultTier;
}

export function ResultTierBadge({ tier }: ResultTierBadgeProps) {
  const s = TIER_STYLES[tier];
  return (
    <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${s.bg} ${s.border}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
      <div>
        <p className={`text-xs font-semibold ${s.text}`}>{s.label}</p>
        <p className={`text-[10px] opacity-75 ${s.text}`}>{s.hint}</p>
      </div>
    </div>
  );
}
