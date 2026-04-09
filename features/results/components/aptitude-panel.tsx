import { SkillBar } from "@/features/results/components/skill-bar";
import type { SkillsDict } from "@/types/test-results";

const SKILL_META: Record<
  keyof SkillsDict,
  { label: string; description: string; stemImpact: string }
> = {
  RC: {
    label: "Comprension Lectora",
    description: "Mide la capacidad para comprender textos escritos, identificar ideas principales y extraer informacion relevante.",
    stemImpact: "Esencial para interpretar publicaciones cientificas, documentacion tecnica, manuales de ingenieria y enunciados de problemas complejos.",
  },
  DR: {
    label: "Razonamiento Deductivo",
    description: "Evalua la capacidad para derivar conclusiones validas a partir de premisas y reglas logicas.",
    stemImpact: "Base del pensamiento computacional, la demostracion matematica, la programacion logica y el analisis formal de sistemas.",
  },
  IR: {
    label: "Razonamiento Inductivo",
    description: "Mide la capacidad para identificar patrones en datos visuales o abstractos y generalizar reglas a partir de ellos.",
    stemImpact: "Fundamental en ciencia de datos, biologia, fisica experimental y aprendizaje automatico, donde se infieren reglas desde observaciones.",
  },
  MR: {
    label: "Razonamiento Matematico",
    description: "Evalua el razonamiento logico-matematico aplicado a la resolucion de problemas numericos y geometricos.",
    stemImpact: "Nucleo de la ingenieria, fisica, quimica cuantitativa, econometria y ciencias computacionales. Alta correlacion con rendimiento en STEM.",
  },
  SR: {
    label: "Razonamiento Espacial",
    description: "Mide la capacidad para visualizar y rotar mentalmente objetos en el espacio tridimensional.",
    stemImpact: "Fundamental en arquitectura, diseno mecanico, cirugia, robotica y visualizacion de estructuras moleculares o datos 3D.",
  },
  SA: {
    label: "Atencion Selectiva",
    description: "Evalua la rapidez y precision para localizar un estimulo diferente dentro de un conjunto de distractores similares.",
    stemImpact: "Clave en medicina clinica, ciberseguridad, pilotaje, control de sistemas criticos y cualquier rol que requiera monitoreo continuo.",
  },
};

function scoreLabel(pct: number): { text: string; color: string } {
  if (pct >= 70) return { text: "Fortaleza — rendimiento destacado.", color: "text-emerald-600" };
  if (pct >= 40) return { text: "En desarrollo — dentro del promedio.", color: "text-amber-600" };
  return { text: "Area de mejora — reforzar amplia tus opciones STEM.", color: "text-rose-500" };
}

interface AptitudePanelProps {
  skills: SkillsDict;
}

export function AptitudePanel({ skills }: AptitudePanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Aptitudes</h2>

      <div className="space-y-2">
        {(Object.keys(SKILL_META) as (keyof SkillsDict)[]).map((key) => {
          const pct = Math.round(skills[key] * 100);
          const { text: interpText, color: interpColor } = scoreLabel(pct);
          const meta = SKILL_META[key];

          return (
            <div key={key} className="rounded-xl border border-slate-100 bg-white">
              {/* Bar row — always visible */}
              <div className="px-4 pt-3.5 pb-2">
                <SkillBar label={meta.label} percentage={pct} />
              </div>

              {/* Individual collapsible */}
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-b-xl px-4 pb-3 text-[11px] font-medium text-slate-400 hover:text-slate-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="group-open:hidden">Ver detalle</span>
                  <span className="hidden group-open:inline">Ocultar detalle</span>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
