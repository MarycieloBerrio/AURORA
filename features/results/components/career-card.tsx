import type { MockCareer } from "@/constants/mock-careers";

const AFFINITY_STYLES = [
  { threshold: 80, badge: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { threshold: 60, badge: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { threshold: 40, badge: "bg-amber-100 text-amber-700 border-amber-200" },
  { threshold: 0,  badge: "bg-slate-100 text-slate-600 border-slate-200" },
] as const;

const LEVEL_STYLES: Record<string, string> = {
  Pregrado:   "bg-violet-50 text-violet-600 border-violet-200",
  Tecnología: "bg-sky-50 text-sky-600 border-sky-200",
};

function resolveAffinityStyle(pct: number) {
  return (
    AFFINITY_STYLES.find((s) => pct >= s.threshold) ??
    AFFINITY_STYLES[AFFINITY_STYLES.length - 1]
  );
}

interface CareerCardProps {
  career: MockCareer;
  rank: number;
}

export function CareerCard({ career, rank }: CareerCardProps) {
  const style = resolveAffinityStyle(career.affinity);
  const levelStyle = LEVEL_STYLES[career.level] ?? "bg-slate-50 text-slate-500 border-slate-200";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-sm transition-shadow hover:shadow-md">
      <span className="w-5 shrink-0 text-center text-xs font-bold text-slate-300">{rank}</span>

      <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">{career.title}</p>
          <span className={`mt-0.5 inline-block rounded border px-1.5 py-px text-[10px] font-medium ${levelStyle}`}>
            {career.level}
          </span>
        </div>
        <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-xs font-bold ${style.badge}`}>
          {career.affinity}%
        </span>
      </div>
    </div>
  );
}
