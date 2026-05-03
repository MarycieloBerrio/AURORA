import type { SkillsDict } from "@/types/test-results";
import type { CareerOverlay } from "@/features/results/lib/career-colors";
import { AptitudeChart } from "@/features/results/components/aptitude-chart";

const SKILL_META: Record<
  keyof SkillsDict,
  { label: string; description: string; stemImpact: string; high: string; medium: string; low: string }
> = {
  RC: {
    label: "Comprension Lectora",
    description: "Mide la capacidad para comprender textos escritos, identificar ideas principales y extraer informacion relevante.",
    stemImpact: "Esencial para interpretar publicaciones cientificas, documentacion tecnica, manuales de ingenieria y enunciados de problemas complejos.",
    high: "Fortaleza destacada. Comprendes textos complejos con facilidad, lo que amplía tus opciones en cualquier carrera con alto componente teórico o técnico.",
    medium: "En desarrollo. Lees con comprensión aceptable; practicar con textos más técnicos y académicos fortalecerá esta habilidad.",
    low: "Área de mejora. Reforzar la comprensión lectora ampliará tus opciones en carreras con alto componente teórico.",
  },
  DR: {
    label: "Razonamiento Deductivo",
    description: "Evalua la capacidad para derivar conclusiones validas a partir de premisas y reglas logicas.",
    stemImpact: "Base del pensamiento computacional, la demostracion matematica, la programacion logica y el analisis formal de sistemas.",
    high: "Fortaleza destacada. Derivas conclusiones con precisión lógica, una habilidad clave en programación, matemáticas y derecho.",
    medium: "En desarrollo. Tu razonamiento lógico es funcional; los ejercicios de lógica formal y programación básica pueden potenciarlo.",
    low: "Área de mejora. Ejercitar la lógica formal y la programación básica puede fortalecer significativamente esta capacidad.",
  },
  IR: {
    label: "Razonamiento Inductivo",
    description: "Mide la capacidad para identificar patrones en datos visuales o abstractos y generalizar reglas a partir de ellos.",
    stemImpact: "Fundamental en ciencia de datos, biologia, fisica experimental y aprendizaje automatico, donde se infieren reglas desde observaciones.",
    high: "Fortaleza destacada. Identificas patrones con rapidez, una ventaja directa en ciencia de datos, biología e inteligencia artificial.",
    medium: "En desarrollo. Reconoces patrones con regularidad; la práctica con series y matrices puede elevar esta habilidad.",
    low: "Área de mejora. Los ejercicios de series, matrices y analogías pueden ayudarte a desarrollar esta capacidad.",
  },
  MR: {
    label: "Razonamiento Matematico",
    description: "Evalua el razonamiento logico-matematico aplicado a la resolucion de problemas numericos y geometricos.",
    stemImpact: "Nucleo de la ingenieria, fisica, quimica cuantitativa, econometria y ciencias computacionales. Alta correlacion con rendimiento en STEM.",
    high: "Fortaleza destacada. Tu capacidad cuantitativa es alta, lo que abre puertas directas a ingeniería, física y ciencias computacionales.",
    medium: "En desarrollo. Tu rendimiento matemático es adecuado; consolidar bases en álgebra y aritmética puede abrirte más opciones STEM.",
    low: "Área de mejora. Reforzar conceptos matemáticos fundamentales amplía significativamente tus opciones en carreras técnicas.",
  },
  SR: {
    label: "Razonamiento Espacial",
    description: "Mide la capacidad para visualizar y rotar mentalmente objetos en el espacio tridimensional.",
    stemImpact: "Fundamental en arquitectura, diseno mecanico, cirugia, robotica y visualizacion de estructuras moleculares o datos 3D.",
    high: "Fortaleza destacada. Visualizas y manipulas objetos en el espacio con facilidad, una ventaja directa en arquitectura, ingeniería y diseño.",
    medium: "En desarrollo. Tienes capacidad espacial funcional; el dibujo técnico y los puzzles 3D pueden potenciarla.",
    low: "Área de mejora. La práctica con puzzles espaciales y modelado 3D puede desarrollar esta habilidad con el tiempo.",
  },
  SA: {
    label: "Atencion Selectiva",
    description: "Evalua la rapidez y precision para localizar un estimulo diferente dentro de un conjunto de distractores similares.",
    stemImpact: "Clave en medicina clinica, ciberseguridad, pilotaje, control de sistemas criticos y cualquier rol que requiera monitoreo continuo.",
    high: "Fortaleza destacada. Localizas estímulos relevantes con rapidez y precisión, una habilidad crítica en medicina, ciberseguridad y control de sistemas.",
    medium: "En desarrollo. Tu atención selectiva es adecuada; actividades de concentración y vigilancia sostenida pueden fortalecerla.",
    low: "Área de mejora. Mejorar esta habilidad puede abrirte roles que exigen monitoreo detallado o trabajo en entornos de alta alerta.",
  },
};

function scoreLabel(meta: (typeof SKILL_META)[keyof SkillsDict], pct: number): { text: string; color: string } {
  if (pct >= 70) return { text: meta.high, color: "text-emerald-600" };
  if (pct >= 40) return { text: meta.medium, color: "text-amber-600" };
  return { text: meta.low, color: "text-rose-500" };
}

interface AptitudePanelProps {
  skills: SkillsDict;
  overlays?: CareerOverlay[];
}

export function AptitudePanel({ skills, overlays }: AptitudePanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Aptitudes</h2>

      {/* Grouped bar chart */}
      <AptitudeChart skills={skills} overlays={overlays} />

      {/* Per-skill collapsible details */}
      <div className="space-y-2">
        {(Object.keys(SKILL_META) as (keyof SkillsDict)[]).map((key) => {
          const pct = Math.round(skills[key] * 100);
          const meta = SKILL_META[key];
          const { text: interpText, color: interpColor } = scoreLabel(meta, pct);

          return (
            <details key={key} className="group rounded-xl border border-slate-100 bg-white">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-[11px] font-medium text-slate-500 hover:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1">{meta.label}</span>
                <span className={`font-bold ${interpColor}`}>{pct}%</span>
              </summary>

              <div className="space-y-2.5 border-t border-slate-100 px-4 py-3">
                <p className="text-[11px] leading-snug text-slate-600">{meta.description}</p>

                <div className="rounded-lg bg-emerald-50 px-3 py-2">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                    Impacto en STEM
                  </p>
                  <p className="text-[11px] leading-snug text-emerald-700">{meta.stemImpact}</p>
                </div>

                <p className={`text-[11px] font-semibold ${interpColor}`}>{interpText}</p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
