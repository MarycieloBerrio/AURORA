import { RadarChart } from "@/features/results/components/radar-chart";
import type { InterestsList } from "@/types/test-results";

const DIMENSION_INFO: Record<
  keyof InterestsList,
  { name: string; description: string }
> = {
  R: { name: "Realista", description: "Prefiere actividades practicas con objetos, herramientas y maquinaria. Orientado a lo concreto y manual." },
  I: { name: "Investigativo", description: "Orientado al analisis, la ciencia y la resolucion de problemas complejos. Disfruta explorar ideas y datos." },
  A: { name: "Artistico", description: "Valora la creatividad, la expresion y los entornos no estructurados. Sensible a la estetica y la innovacion." },
  S: { name: "Social", description: "Disfruta ensenar, ayudar e interactuar de manera significativa con personas. Orientado al servicio." },
  E: { name: "Emprendedor", description: "Orientado al liderazgo, la persuasion y el logro de objetivos. Disfruta los retos competitivos." },
  C: { name: "Convencional", description: "Le gustan las tareas ordenadas, los datos y los sistemas estructurados. Alto sentido de la precision." },
};

function hollandCode(interests: InterestsList): string {
  return (Object.keys(interests) as (keyof InterestsList)[])
    .sort((a, b) => interests[b] - interests[a])
    .slice(0, 3)
    .join("");
}

const SORTED_DIMS: (keyof InterestsList)[] = ["R", "I", "A", "S", "E", "C"];

interface RiasecPanelProps {
  interests: InterestsList;
}

export function RiasecPanel({ interests }: RiasecPanelProps) {
  const code = hollandCode(interests);
  const sortedByScore = [...SORTED_DIMS].sort((a, b) => interests[b] - interests[a]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Intereses — RIASEC
        </h2>
        <a
          href="https://www.onetcenter.org/IP.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-indigo-600 hover:underline"
        >
          Documentacion oficial
        </a>
      </div>

      {/* Chart — primary view, full-width */}
      <RadarChart interests={interests} />

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
          <div className="mb-3 flex items-center gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Codigo Holland
              </p>
              <p className="text-2xl font-black tracking-widest text-indigo-600">{code}</p>
              <p className="text-[10px] text-slate-400">Tus 3 dimensiones dominantes</p>
            </div>
          </div>
          {sortedByScore.map((dim) => {
            const pct = Math.round(interests[dim]);
            return (
              <div key={dim} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-black text-indigo-700">
                      {dim}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {DIMENSION_INFO[dim].name}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600">{pct}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-indigo-400"
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
