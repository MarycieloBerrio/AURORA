import type { CareerWithAffinity } from "@/constants/careers";
import { CareerCard } from "@/features/results/components/career-card";
import type { CareerOverlay } from "@/features/results/lib/career-colors";
import type { CareerGroup as CareerGroupData } from "@/features/results/lib/career-groups";

interface CareerGroupProps {
  group: CareerGroupData;
  overlays: CareerOverlay[];
  onSelect: (career: CareerWithAffinity) => void;
  onViewOfferings: (career: CareerWithAffinity) => void;
}

export function CareerGroup({
  group,
  overlays,
  onSelect,
  onViewOfferings,
}: CareerGroupProps) {
  return (
    <section className="space-y-2" aria-labelledby={`career-group-${group.id}`}>
      <div className="flex items-center gap-2 pt-1">
        <h3
          id={`career-group-${group.id}`}
          className="shrink-0 text-[11px] font-semibold uppercase tracking-widest text-slate-500"
        >
          {group.label}
        </h3>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="space-y-2">
        {group.careers.map((career) => {
          const overlay = overlays.find(
            (item) => item.career.onetsoc_code === career.onetsoc_code,
          );

          return (
            <CareerCard
              key={career.onetsoc_code}
              career={career}
              overlay={overlay}
              onClick={() => onSelect(career)}
              onViewOfferings={() => onViewOfferings(career)}
            />
          );
        })}
      </div>
    </section>
  );
}
