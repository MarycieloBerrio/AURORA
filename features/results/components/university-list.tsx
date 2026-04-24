import type { ProgramOffering } from "@prisma/client";
import { UniversityCard } from "@/features/results/components/university-card";

interface UniversityListProps {
  offerings: ProgramOffering[];
  onFocusOffering: (offering: ProgramOffering) => void;
}

export function UniversityList({ offerings, onFocusOffering }: UniversityListProps) {
  const count = offerings.length;

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {count} {count === 1 ? "universidad encontrada" : "universidades encontradas"}
      </p>

      {count === 0 ? (
        <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-[11px] text-slate-400">
          No hay resultados para estos filtros
        </p>
      ) : (
        <div className="space-y-2">
          {offerings.map((offering) => (
            <UniversityCard
              key={offering.id}
              offering={offering}
              onFocus={
                offering.lat !== null
                  ? () => onFocusOffering(offering)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
