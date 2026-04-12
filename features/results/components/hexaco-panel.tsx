import { HexacoChart } from "@/features/results/components/hexaco-chart";
import type { PersonalityList } from "@/types/test-results";
import { HEXACO_DIMENSIONS, type HexacoDimension } from "@/types/test-results";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

const DIMENSION_INFO: Record<HexacoDimension, { name: string; description: string }> = {
  H: { name: "Honestidad", description: "Sincero, justo y con poco interes en el estatus social. Evita la manipulacion y actua con integridad." },
  E: { name: "Emocionalidad", description: "Empatico, sensible al peligro y emocionalmente cercano. Busca apoyo emocional en situaciones dificiles." },
  X: { name: "Extraversion", description: "Sociable, animado y positivo en contextos sociales. Disfruta la interaccion y se expresa con facilidad." },
  A: { name: "Amabilidad", description: "Comprensivo, flexible y tolerante ante los conflictos. Valora la cooperacion sobre la competencia." },
  C: { name: "Conciencia", description: "Organizado, disciplinado y orientado al logro de metas. Alta capacidad de planificacion y autocontrol." },
  O: { name: "Apertura", description: "Curioso, creativo e interesado en ideas y experiencias nuevas. Aprecia el arte, la ciencia y la innovacion." },
};

interface HexacoPanelProps {
  personality: PersonalityList;
  overlays?: CareerOverlay[];
}

export function HexacoPanel({ personality, overlays }: HexacoPanelProps) {
  const sortedDims = [...HEXACO_DIMENSIONS].sort((a, b) => personality[b] - personality[a]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Personalidad — HEXACO
        </h2>
        <a
          href="https://hexaco.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-amber-600 hover:underline"
        >
          Documentacion oficial
        </a>
      </div>

      {/* Chart — primary view */}
      <HexacoChart personality={personality} overlays={overlays} />

      {/* Collapsible detail */}
      <details className="group rounded-xl border border-slate-100 bg-slate-50">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700">
          <span>Ver perfil detallado</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </summary>

        <div className="space-y-2 px-4 pb-4 pt-2">
          {sortedDims.map((dim) => {
            const pct = Math.max(1, Math.round(personality[dim]));
            return (
              <div key={dim} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-black text-amber-700">
                      {dim}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {DIMENSION_INFO[dim].name}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-600">{pct}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] leading-snug text-slate-500">
                  {DIMENSION_INFO[dim].description}
                </p>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
