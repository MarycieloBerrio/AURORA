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
  UN: "Profesional",
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
  career:           CareerWithAffinity;
  rank:             number;
  overlay?:         CareerOverlay;
  onClick?:         () => void;
  onViewOfferings?: () => void;
}

export function CareerCard({ career, rank, overlay, onClick, onViewOfferings }: CareerCardProps) {
  const isSelected    = !!overlay;
  const affinityStyle = resolveAffinityStyle(career.affinity);
  const levelLabel    = LEVEL_LABELS[career.academic_level];
  const levelStyle    = LEVEL_STYLES[career.academic_level];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-left shadow-sm transition-all hover:shadow-md ${
        isSelected ? "border-2" : "border-slate-100 bg-white"
      }`}
      style={
        isSelected
          ? { borderColor: overlay!.color, backgroundColor: overlay!.color + "18" }
          : undefined
      }
    >
      {isSelected && (
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: overlay!.color }}
        />
      )}

      <span className="w-5 shrink-0 text-center text-xs font-bold text-slate-300">{rank}</span>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">{career.title}</p>
          <span className={`mt-0.5 inline-block rounded border px-1.5 py-px text-[10px] font-medium ${levelStyle}`}>
            {levelLabel}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className={`rounded-lg border px-2 py-0.5 text-xs font-bold ${affinityStyle.badge}`}>
            {career.affinity}%
          </span>
          {onViewOfferings && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewOfferings();
              }}
              aria-label={`Ver oferta universitaria para ${career.title}`}
              className="rounded-lg border border-slate-200 p-1 text-slate-400 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-3.5 w-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
