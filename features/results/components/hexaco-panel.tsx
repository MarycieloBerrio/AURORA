import { HexacoChart } from "@/features/results/components/hexaco-chart";
import type { PersonalityList } from "@/types/test-results";
import { HEXACO_DIMENSIONS, type HexacoDimension } from "@/types/test-results";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

const DIMENSION_INFO: Record<HexacoDimension, { name: string; high: string; medium: string; low: string }> = {
  H: {
    name: "Honestidad",
    high: "Obtienes una puntuación alta en Honestidad-Humildad: eres sincero, leal y actúas con integridad incluso cuando nadie te observa. No te motivan el estatus ni los privilegios materiales. Estas características son muy valoradas en entornos científicos, educativos y en cualquier carrera donde la ética profesional sea central.",
    medium: "Tienes un nivel moderado de Honestidad-Humildad: equilibras la honestidad con el pragmatismo necesario para desenvolverte en entornos competitivos. Puedes adaptarte sin perder tu núcleo ético.",
    low: "Puntúas más bajo en Honestidad-Humildad, lo que puede reflejar una orientación hacia el logro de metas y el reconocimiento personal. En entornos competitivos y de liderazgo esto puede ser una ventaja si se gestiona con equilibrio ético.",
  },
  E: {
    name: "Emocionalidad",
    high: "Tienes una alta Emocionalidad: eres empático, te afectan las situaciones difíciles y buscas apoyo emocional en momentos de estrés. Esta sensibilidad es un activo en profesiones de cuidado, salud mental, educación y trabajo social, donde conectar emocionalmente con otros es esencial.",
    medium: "Tienes un nivel moderado de Emocionalidad: eres sensible ante los demás sin que esto afecte significativamente tu estabilidad. Puedes manejar situaciones de presión con relativa calma mientras mantienes empatía.",
    low: "Puntúas más bajo en Emocionalidad: tiendes a mantenerte estable bajo presión y a tomar decisiones de forma más analítica que emocional. Esto es una fortaleza en entornos de alta demanda como medicina de urgencias, ingeniería de sistemas críticos o negociación.",
  },
  X: {
    name: "Extraversión",
    high: "Tienes una alta Extraversión: disfrutas la interacción social, te energizas con los demás y te expresas con facilidad. El trabajo en equipo, la comunicación y los entornos dinámicos son tu hábitat natural. Roles de liderazgo, docencia, ventas y relaciones públicas se ajustan bien a tu perfil.",
    medium: "Tienes un nivel moderado de Extraversión (ambivertido): puedes trabajar bien tanto en equipo como de forma independiente. Esta flexibilidad es muy valiosa en entornos profesionales variados.",
    low: "Puntúas más bajo en Extraversión: prefieres entornos tranquilos, el trabajo independiente y las interacciones en grupos pequeños. La concentración profunda que esto facilita es una ventaja en investigación, programación, escritura y análisis.",
  },
  A: {
    name: "Amabilidad",
    high: "Tienes una alta Amabilidad: eres comprensivo, paciente y evitas el conflicto. Valoras la cooperación sobre la competencia. Estas cualidades son un activo en trabajo en equipo, mediación, atención al cliente y entornos colaborativos.",
    medium: "Tienes un nivel moderado de Amabilidad: puedes cooperar eficazmente pero también defender tu posición cuando es necesario. Este equilibrio es especialmente útil en roles que requieren tanto colaboración como asertividad.",
    low: "Puntúas más bajo en Amabilidad: puedes ser crítico, directo y no temes el conflicto cuando lo consideras necesario. Esta asertividad puede ser una fortaleza en negociación, liderazgo e investigación crítica.",
  },
  C: {
    name: "Conciencia",
    high: "Tienes una alta Conciencia: eres organizado, disciplinado y cumples con tus compromisos de forma confiable. Te esfuerzas por la excelencia y planificas con anticipación. Estas cualidades son altamente valoradas en medicina, ingeniería, derecho y ciencias.",
    medium: "Tienes un nivel moderado de Conciencia: eres suficientemente organizado para cumplir tus compromisos aunque también puedes adaptarte a entornos más flexibles. Herramientas de planificación pueden potenciar esta dimensión.",
    low: "Puntúas más bajo en Conciencia: tiendes a preferir la flexibilidad sobre la planificación estricta. En entornos creativos o de innovación, esta espontaneidad puede ser un activo si se complementa con hábitos de organización básicos.",
  },
  O: {
    name: "Apertura",
    high: "Tienes una alta Apertura a la Experiencia: eres curioso, imaginativo y buscas activamente nuevas ideas. Te atraen el arte, la ciencia, la filosofía y el pensamiento abstracto. Investigación, diseño, innovación y artes son entornos donde puedes desarrollarte plenamente.",
    medium: "Tienes un nivel moderado de Apertura: combinas curiosidad intelectual con aprecio por lo práctico y familiar. Esto te permite adaptarte a roles que requieran tanto innovación como ejecución sistemática.",
    low: "Puntúas más bajo en Apertura a la Experiencia: prefieres lo concreto y lo probado sobre lo abstracto o especulativo. Esta orientación es una fortaleza en operaciones, administración y roles donde la ejecución consistente es más valorada que la innovación.",
  },
};

function dimensionText(dim: HexacoDimension, pct: number): string {
  const info = DIMENSION_INFO[dim];
  if (pct >= 70) return info.high;
  if (pct >= 40) return info.medium;
  return info.low;
}

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
