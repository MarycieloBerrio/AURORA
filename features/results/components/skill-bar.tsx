const SCORE_STYLES = [
  { threshold: 70, bar: "bg-emerald-500", label: "text-emerald-600" },
  { threshold: 40, bar: "bg-amber-400", label: "text-amber-600" },
  { threshold: 0, bar: "bg-rose-400", label: "text-rose-500" },
] as const;

function resolveScoreStyle(pct: number) {
  return SCORE_STYLES.find((s) => pct >= s.threshold) ?? SCORE_STYLES[SCORE_STYLES.length - 1];
}

interface SkillBarProps {
  label: string;
  percentage: number;
}

export function SkillBar({ label, percentage }: SkillBarProps) {
  const pct = Math.round(Math.min(100, Math.max(0, percentage)));
  const style = resolveScoreStyle(pct);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className={`text-xs font-bold ${style.label}`}>{pct}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${style.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
