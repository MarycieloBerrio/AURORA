import type { ProgramOffering } from "@prisma/client";
import { Badge } from "@/components/atoms/badge";

interface UniversityCardProps {
  offering: ProgramOffering;
  onFocus?: () => void;
}

const CHARACTER_VARIANT: Record<string, "indigo" | "amber"> = {
  Oficial: "indigo",
  Privada: "amber",
};

const METHODOLOGY_VARIANT: Record<string, "emerald" | "sky" | "slate"> = {
  Presencial:    "emerald",
  "A Distancia": "sky",
  Virtual:       "slate",
};

export function UniversityCard({ offering, onFocus }: UniversityCardProps) {
  const charVariant  = CHARACTER_VARIANT[offering.character]    ?? "slate";
  const methVariant  = METHODOLOGY_VARIANT[offering.methodology] ?? "slate";
  const hasCoords    = offering.lat !== null && offering.lng !== null;

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
      <p className="text-sm font-semibold leading-snug text-slate-800">
        {offering.institutionName}
      </p>
      <p className="text-[11px] text-slate-500">
        {offering.municipality}, {offering.department}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant={charVariant}>{offering.character}</Badge>
        <Badge variant={methVariant}>{offering.methodology}</Badge>
      </div>
      {hasCoords && onFocus && (
        <button
          type="button"
          onClick={onFocus}
          className="mt-0.5 self-start text-[10px] font-medium text-indigo-600 hover:underline"
        >
          Ver en mapa
        </button>
      )}
    </div>
  );
}
