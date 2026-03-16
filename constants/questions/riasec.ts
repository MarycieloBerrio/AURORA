import type { RiasecDimension } from "@/types/test-results";

export interface RiasecQuestion {
  key: string;
  statement: string;
  dimension: RiasecDimension;
  order: number;
}

/**
 * Placeholder RIASEC questions — 4 per dimension (24 total).
 * Replace with validated psychometric items when available.
 */
export const RIASEC_QUESTIONS: RiasecQuestion[] = [
  // R — Realistic
  { key: "r1", statement: "Me gusta trabajar con herramientas y maquinaria.", dimension: "R", order: 1 },
  { key: "r2", statement: "Disfruto las actividades al aire libre y el trabajo físico.", dimension: "R", order: 2 },
  { key: "r3", statement: "Prefiero arreglar cosas con mis propias manos.", dimension: "R", order: 3 },
  { key: "r4", statement: "Me interesa saber cómo funcionan los aparatos mecánicos.", dimension: "R", order: 4 },

  // I — Investigative
  { key: "i1", statement: "Me gusta investigar y descubrir cosas nuevas.", dimension: "I", order: 5 },
  { key: "i2", statement: "Disfruto resolver problemas complejos paso a paso.", dimension: "I", order: 6 },
  { key: "i3", statement: "Me interesa entender las leyes de la naturaleza.", dimension: "I", order: 7 },
  { key: "i4", statement: "Prefiero analizar datos antes de tomar decisiones.", dimension: "I", order: 8 },

  // A — Artistic
  { key: "a1", statement: "Me gusta expresarme a través del arte o la creatividad.", dimension: "A", order: 9 },
  { key: "a2", statement: "Disfruto escribir, dibujar o hacer música.", dimension: "A", order: 10 },
  { key: "a3", statement: "Prefiero trabajar en ambientes donde pueda ser creativo/a.", dimension: "A", order: 11 },
  { key: "a4", statement: "Me atraen las ideas originales y poco convencionales.", dimension: "A", order: 12 },

  // S — Social
  { key: "s1", statement: "Me gusta ayudar a las personas con sus problemas.", dimension: "S", order: 13 },
  { key: "s2", statement: "Disfruto enseñar o explicar cosas a los demás.", dimension: "S", order: 14 },
  { key: "s3", statement: "Prefiero trabajar en equipo que solo/a.", dimension: "S", order: 15 },
  { key: "s4", statement: "Me interesa el bienestar de las personas que me rodean.", dimension: "S", order: 16 },

  // E — Enterprising
  { key: "e1", statement: "Me gusta liderar proyectos y tomar decisiones.", dimension: "E", order: 17 },
  { key: "e2", statement: "Disfruto persuadir y negociar con otras personas.", dimension: "E", order: 18 },
  { key: "e3", statement: "Me motiva competir y alcanzar metas ambiciosas.", dimension: "E", order: 19 },
  { key: "e4", statement: "Prefiero asumir riesgos a quedarme en lo seguro.", dimension: "E", order: 20 },

  // C — Conventional
  { key: "c1", statement: "Me gusta organizar información y mantener el orden.", dimension: "C", order: 21 },
  { key: "c2", statement: "Disfruto seguir procedimientos claros y detallados.", dimension: "C", order: 22 },
  { key: "c3", statement: "Prefiero trabajar con números y datos estructurados.", dimension: "C", order: 23 },
  { key: "c4", statement: "Me siento cómodo/a con tareas repetitivas y precisas.", dimension: "C", order: 24 },
];
