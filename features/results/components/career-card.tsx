import type { CareerWithAffinity } from "@/constants/careers";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

const AFFINITY_STYLES = [
  { threshold: 80, badge: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { threshold: 60, badge: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { threshold: 40, badge: "bg-amber-100 text-amber-700 border-amber-200" },
  { threshold: 0,  badge: "bg-slate-100 text-slate-600 border-slate-200" },
] as const;

const LEVEL_LABELS: Record<"TG" | "UN", string> = {
  TG: "Tecnología",
  UN: "Pregrado",
};

const LEVEL_STYLES: Record<"TG" | "UN", string> = {
  TG: "bg-sky-50 text-sky-600 border-sky-200",
  UN: "bg-violet-50 text-violet-600 border-violet-200",
};

function resolveAffinityStyle(pct: number) {
  return (
    AFFINITY_STYLES.find((s) => pct >= s.threshold) ??
    AFFINITY_STYLES[AFFINITY_STYLES.length - 1]
  );
}

interface CareerCardProps {
  career: CareerWithAffinity;
  rank: number;
  overlay?: CareerOverlay;
  onClick?: () => void;
}

export function CareerCard({ career, rank, overlay, onClick }: CareerCardProps) {
  const isSelected = !!overlay;
  const affinityStyle = resolveAffinityStyle(career.affinity);
  const levelLabel    = LEVEL_LABELS[career.academic_level];
  const levelStyle    = LEVEL_STYLES[career.academic_level];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 shadow-sm transition-all text-left hover:shadow-md ${
        isSelected ? "border-2" : "border-slate-100 bg-white"
      }`}
      style={isSelected ? { borderColor: overlay!.color, backgroundColor: overlay!.color + "18" } : undefined}
    >
      {isSelected && (
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: overlay!.color }} />
      )}

      <span className="w-5 shrink-0 text-center text-xs font-bold text-slate-300">{rank}</span>

      <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">{career.title}</p>
          <span className={`mt-0.5 inline-block rounded border px-1.5 py-px text-[10px] font-medium ${levelStyle}`}>
            {levelLabel}
          </span>
        </div>
        <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-xs font-bold ${affinityStyle.badge}`}>
          {career.affinity}%
        </span>
      </div>
    </button>
  );
}
