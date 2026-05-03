import { RadarChart } from "@/features/results/components/radar-chart";
import type { InterestsList } from "@/types/test-results";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

const DIMENSION_INFO: Record<
  keyof InterestsList,
  { name: string; high: string; medium: string; low: string }
> = {
  R: {
    name: "Realista",
    high: "Tienes una marcada preferencia por trabajar con herramientas, máquinas y entornos físicos. Eres práctico, concreto y disfrutas ver resultados tangibles de tu trabajo. Carreras como ingeniería mecánica, arquitectura técnica o tecnología industrial son un ajuste natural para ti.",
    medium: "Tienes cierta afinidad por lo práctico y manual, aunque no es tu orientación dominante. Puedes desempeñarte bien en roles que combinen trabajo técnico con otras dimensiones más desarrolladas en tu perfil.",
    low: "Prefieres entornos que no dependan del trabajo físico o mecánico directo. Roles de investigación abstracta, trabajo social o gestión creativa se alinean mejor con tu perfil.",
  },
  I: {
    name: "Investigativo",
    high: "Tienes una orientación científica y analítica muy marcada. Disfrutas investigar, resolver problemas complejos y explorar ideas en profundidad. Eres independiente intelectualmente y buscas entender el porqué de las cosas. Las ciencias, la investigación y el pensamiento computacional son áreas naturales para ti.",
    medium: "Tienes interés por el análisis y la resolución de problemas, aunque combinas esta orientación con otros estilos. Roles que requieran pensamiento crítico sin ser puramente investigativos pueden ser un buen ajuste.",
    low: "Prefieres la acción y la interacción sobre el análisis profundo. Roles más prácticos, creativos o sociales pueden resultarte más motivadores que la investigación abstracta.",
  },
  A: {
    name: "Artístico",
    high: "Tienes una fuerte orientación creativa y expresiva. Valoras la originalidad, la autonomía y los entornos no estructurados. Tu sensibilidad estética e imaginación son activos clave en diseño, artes, comunicación, publicidad y humanidades.",
    medium: "Tienes un componente creativo que puede enriquecer tu perfil en roles que combinen creatividad con habilidades analíticas o sociales más desarrolladas en ti.",
    low: "Tiendes a preferir entornos más estructurados y predecibles sobre los creativos o ambiguos. Esto puede ser una ventaja en áreas técnicas, organizacionales o científicas donde prima la precisión.",
  },
  S: {
    name: "Social",
    high: "Tienes una orientación genuina hacia las personas: enseñar, ayudar, escuchar y colaborar te resultan actividades naturalmente satisfactorias. Carreras en educación, salud, psicología y trabajo social se alinean directamente con tu perfil.",
    medium: "Disfrutas la interacción social pero también puedes trabajar de forma independiente. Roles que combinen trabajo con personas y tareas técnicas o creativas pueden ser un buen ajuste.",
    low: "Prefieres entornos de trabajo más independientes o estructurados que los roles de alta interacción social. Esto es completamente válido y compatible con carreras técnicas, científicas o creativas.",
  },
  E: {
    name: "Emprendedor",
    high: "Tienes un perfil de liderazgo y persuasión muy marcado. Disfrutas influir en otros, tomar decisiones y asumir retos competitivos. Administración de empresas, derecho, emprendimiento y ventas son entornos donde puedes destacar.",
    medium: "Tienes cierta capacidad de iniciativa y liderazgo, aunque no es tu rasgo dominante. Roles con autonomía moderada y trabajo en equipo pueden potenciar esta dimensión.",
    low: "Prefieres roles de ejecución o especialización sobre los de liderazgo o gestión comercial. Esto te hace especialmente apto para roles técnicos, investigativos o creativos donde el expertise es más valorado que la persuasión.",
  },
  C: {
    name: "Convencional",
    high: "Tienes una marcada preferencia por el orden, la precisión y los sistemas estructurados. Eres metódico, detallista y confiable en la ejecución. Contabilidad, administración, sistemas de información y finanzas son áreas que aprovechan directamente estas fortalezas.",
    medium: "Valoras cierta estructura y organización en tu trabajo, aunque también puedes adaptarte a entornos más flexibles. Este equilibrio es una ventaja en muchos roles profesionales.",
    low: "Prefieres entornos con flexibilidad y variedad sobre los altamente estructurados o rutinarios. Tu perfil encaja mejor con roles creativos, investigativos o de liderazgo dinámico.",
  },
};

function dimensionText(dim: keyof InterestsList, pct: number): string {
  const info = DIMENSION_INFO[dim];
  if (pct >= 70) return info.high;
  if (pct >= 40) return info.medium;
  return info.low;
}

function hollandCode(interests: InterestsList): string {
  return (Object.keys(interests) as (keyof InterestsList)[])
    .sort((a, b) => interests[b] - interests[a])
    .slice(0, 3)
    .join("");
}

const SORTED_DIMS: (keyof InterestsList)[] = ["R", "I", "A", "S", "E", "C"];

interface RiasecPanelProps {
  interests: InterestsList;
  overlays?: CareerOverlay[];
}

export function RiasecPanel({ interests, overlays }: RiasecPanelProps) {
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
          className="text-[11px] font-medium text-violet-600 hover:underline"
        >
          Documentacion oficial
        </a>
      </div>

      {/* Chart — primary view, full-width */}
      <RadarChart interests={interests} overlays={overlays} />

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
              <p className="text-2xl font-black tracking-widest text-violet-600">{code}</p>
              <p className="text-[10px] text-slate-400">Tus 3 dimensiones dominantes</p>
            </div>
          </div>
          {sortedByScore.map((dim) => {
            const pct = Math.round(interests[dim]);
            return (
              <div key={dim} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-[10px] font-black text-violet-700">
                      {dim}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {DIMENSION_INFO[dim].name}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-violet-600">{pct}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-violet-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] leading-snug text-slate-500">
                  {dimensionText(dim, pct)}
                </p>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
