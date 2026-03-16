import type { HexacoDimension } from "@/types/test-results";

export interface HexacoQuestion {
  key: string;
  statement: string;
  dimension: HexacoDimension;
  order: number;
}

/**
 * Placeholder HEXACO questions — 4 per dimension (24 total).
 * Replace with validated psychometric items when available.
 */
export const HEXACO_QUESTIONS: HexacoQuestion[] = [
  // H — Honesty-Humility
  { key: "h1", statement: "Prefiero ser sincero/a aunque me perjudique.", dimension: "H", order: 1 },
  { key: "h2", statement: "No me interesa aparentar ser más de lo que soy.", dimension: "H", order: 2 },
  { key: "h3", statement: "Creo que la honestidad es más importante que el éxito.", dimension: "H", order: 3 },
  { key: "h4", statement: "Me incomoda recibir privilegios que no merezco.", dimension: "H", order: 4 },

  // E — Emotionality
  { key: "em1", statement: "Me preocupo con frecuencia por las cosas.", dimension: "E", order: 5 },
  { key: "em2", statement: "Me afectan emocionalmente las situaciones difíciles.", dimension: "E", order: 6 },
  { key: "em3", statement: "Necesito apoyo emocional de las personas cercanas.", dimension: "E", order: 7 },
  { key: "em4", statement: "Suelo sentir ansiedad ante lo desconocido.", dimension: "E", order: 8 },

  // X — Extraversion
  { key: "x1", statement: "Creo que hago amigos fácilmente.", dimension: "X", order: 9 },
  { key: "x2", statement: "Disfruto ser el centro de atención en reuniones sociales.", dimension: "X", order: 10 },
  { key: "x3", statement: "Me siento lleno/a de energía en compañía de otros.", dimension: "X", order: 11 },
  { key: "x4", statement: "Me resulta fácil iniciar conversaciones con desconocidos.", dimension: "X", order: 12 },

  // A — Agreeableness
  { key: "ag1", statement: "Suelo perdonar a quienes me han ofendido.", dimension: "A", order: 13 },
  { key: "ag2", statement: "Prefiero ceder antes que entrar en conflicto.", dimension: "A", order: 14 },
  { key: "ag3", statement: "Confío en las buenas intenciones de los demás.", dimension: "A", order: 15 },
  { key: "ag4", statement: "Me resulta fácil ser paciente con las personas.", dimension: "A", order: 16 },

  // C — Conscientiousness
  { key: "co1", statement: "Siempre termino lo que empiezo.", dimension: "C", order: 17 },
  { key: "co2", statement: "Me gusta planificar mis actividades con antelación.", dimension: "C", order: 18 },
  { key: "co3", statement: "Soy una persona disciplinada y organizada.", dimension: "C", order: 19 },
  { key: "co4", statement: "Me esfuerzo por hacer las cosas lo mejor posible.", dimension: "C", order: 20 },

  // O — Openness to Experience
  { key: "o1", statement: "Tengo una imaginación vívida.", dimension: "O", order: 21 },
  { key: "o2", statement: "Me fascina aprender sobre culturas y formas de pensar diferentes.", dimension: "O", order: 22 },
  { key: "o3", statement: "Disfruto las actividades que estimulan mi mente.", dimension: "O", order: 23 },
  { key: "o4", statement: "Me interesan las ideas abstractas y filosóficas.", dimension: "O", order: 24 },
];
