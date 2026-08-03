import { AffinityThermometerIcon } from "@/components/atoms/affinity-thermometer-icon";
import {
  AFFINITY_CATEGORY_DEFINITIONS,
  AFFINITY_COPY,
  AFFINITY_UI_CONFIG,
} from "@/features/results/constants/affinity-categories";

export function AffinityLegend() {
  return (
    <section
      aria-labelledby={AFFINITY_UI_CONFIG.legendTitleId}
      className="rounded-xl border border-slate-100 bg-slate-50 p-3"
    >
      <h3
        id={AFFINITY_UI_CONFIG.legendTitleId}
        className="text-[11px] font-semibold uppercase tracking-widest text-slate-500"
      >
        {AFFINITY_COPY.legendTitle}
      </h3>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {AFFINITY_CATEGORY_DEFINITIONS.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <span
              className={`inline-flex rounded-lg border p-1 ${category.colorClassName} ${category.surfaceClassName}`}
            >
              <AffinityThermometerIcon level={category.thermometerLevel} />
            </span>
            <span className="min-w-0 text-xs font-semibold text-slate-700">
              {category.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
