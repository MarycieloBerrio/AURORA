import type { EnrichedSniesProgram } from "@/services/snies-service";
import { Badge } from "@/components/atoms/badge";

interface UniversityCardProps {
  offering: EnrichedSniesProgram;
  onFocus?: () => void;
}

const CHARACTER_VARIANT: Record<string, "indigo" | "violet"> = {
  Oficial:  "indigo",
  Privada:  "violet",
};

const METHODOLOGY_VARIANT: Record<string, "emerald" | "sky" | "slate"> = {
  Presencial:    "emerald",
  "A Distancia": "sky",
  Virtual:       "slate",
};

export function UniversityCard({ offering, onFocus }: UniversityCardProps) {
  const character   = offering.nombrecaracteracademico ?? "Desconocido";
  const methodology = offering.nombremetodologia        ?? "Desconocido";
  const charVariant  = CHARACTER_VARIANT[character]    ?? "slate";
  const methVariant  = METHODOLOGY_VARIANT[methodology] ?? "slate";
  const hasCoords    = offering.lat !== null && offering.lng !== null;

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
      <p className="text-sm font-semibold leading-snug text-slate-800">
        {offering.nombreinstitucion ?? "—"}
      </p>
      <p className="text-[11px] text-slate-500">
        {offering.nombremunicipioprograma}, {offering.nombredepartprograma}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant={charVariant}>{character}</Badge>
        <Badge variant={methVariant}>{methodology}</Badge>
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
