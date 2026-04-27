import type { TestType } from "@/constants/floors";

interface TestTypeProgressProps {
  progress: Record<TestType, { done: number; total: number }>;
}

const categories: { type: TestType; label: string; bar: string; text: string; bg: string }[] = [
  { type: "riasec", label: "Intereses", bar: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-100" },
  { type: "hexaco", label: "Personalidad", bar: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-100" },
  { type: "skill", label: "Aptitudes", bar: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-100" },
];

export function TestTypeProgress({ progress }: TestTypeProgressProps) {
  return (
    <div className="absolute right-3 top-3 z-20 w-44 space-y-2 rounded-xl bg-white/80 p-3 shadow-lg backdrop-blur-sm md:w-52">
      {categories.map(({ type, label, bar, text, bg }) => {
        const { done, total } = progress[type];
        const pct = total > 0 ? (done / total) * 100 : 0;

        return (
          <div key={type} className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-semibold md:text-xs ${text}`}>{label}</span>
              <span className="text-[10px] font-medium text-slate-500 md:text-xs">
                {done}/{total}
              </span>
            </div>
            <div className={`h-1.5 overflow-hidden rounded-full ${bg}`}>
              <div
                className={`h-full rounded-full ${bar} transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
