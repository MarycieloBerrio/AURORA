import type { HexacoDimension, HexacoBlock } from "@/types/test-results";

export type { HexacoBlock };

export interface HexacoQuestion {
  id: string;
  statement: string;
  dimension: HexacoDimension;
  block: HexacoBlock;
  reversed: boolean;
  order: number;
}

export const HEXACO_QUESTIONS: HexacoQuestion[] = [
  // --- Bloque A (24 ítems) ---
  { id: "HX01", statement: "Procuro decir la verdad aunque me resulte incómodo.", dimension: "H", block: "A", reversed: false, order: 1 },
  { id: "HX02", statement: "Me importa compartir el crédito cuando logro algo en equipo.", dimension: "H", block: "A", reversed: false, order: 2 },
  { id: "HX03", statement: "Si pudiera obtener una ventaja sin que nadie se entere, lo consideraría aceptable.", dimension: "H", block: "A", reversed: true, order: 3 },
  { id: "HX04", statement: "Me gusta que me traten como una persona especial, incluso sin haberlo ganado.", dimension: "H", block: "A", reversed: true, order: 4 },
  { id: "HX05", statement: "Me preocupo fácilmente cuando alguien cercano enfrenta un problema.", dimension: "E", block: "A", reversed: false, order: 5 },
  { id: "HX06", statement: "Cuando estoy bajo presión, busco apoyo emocional en personas de confianza.", dimension: "E", block: "A", reversed: false, order: 6 },
  { id: "HX07", statement: "Rara vez siento miedo, incluso en situaciones que podrían ser peligrosas.", dimension: "E", block: "A", reversed: true, order: 7 },
  { id: "HX08", statement: "Puedo despedirme de alguien importante sin sentir mucha tristeza.", dimension: "E", block: "A", reversed: true, order: 8 },
  { id: "HX09", statement: "Me resulta natural iniciar conversaciones con personas que no conozco.", dimension: "X", block: "A", reversed: false, order: 9 },
  { id: "HX10", statement: "En reuniones, suelo aportar energía y entusiasmo.", dimension: "X", block: "A", reversed: false, order: 10 },
  { id: "HX11", statement: "Prefiero observar en silencio antes que hablar en un grupo.", dimension: "X", block: "A", reversed: true, order: 11 },
  { id: "HX12", statement: "Me cuesta sentirme seguro/a cuando soy el centro de atención.", dimension: "X", block: "A", reversed: true, order: 12 },
  { id: "HX13", statement: "Puedo mantener la calma aunque alguien me hable con brusquedad.", dimension: "A", block: "A", reversed: false, order: 13 },
  { id: "HX14", statement: "Si alguien se equivoca conmigo, suelo darle una segunda oportunidad.", dimension: "A", block: "A", reversed: false, order: 14 },
  { id: "HX15", statement: "Me irrito con facilidad cuando las cosas no salen como espero.", dimension: "A", block: "A", reversed: true, order: 15 },
  { id: "HX16", statement: "Guardo resentimiento por mucho tiempo después de una discusión.", dimension: "A", block: "A", reversed: true, order: 16 },
  { id: "HX17", statement: "Antes de empezar una tarea, suelo organizarme y definir pasos.", dimension: "C", block: "A", reversed: false, order: 17 },
  { id: "HX18", statement: "Cumplo mis compromisos incluso cuando no tengo ganas.", dimension: "C", block: "A", reversed: false, order: 18 },
  { id: "HX19", statement: "Dejo tareas importantes para después aunque tenga tiempo.", dimension: "C", block: "A", reversed: true, order: 19 },
  { id: "HX20", statement: "A menudo actúo sin pensar en las consecuencias.", dimension: "C", block: "A", reversed: true, order: 20 },
  { id: "HX21", statement: "Disfruto explorar música, arte o literatura diferentes a lo habitual.", dimension: "O", block: "A", reversed: false, order: 21 },
  { id: "HX22", statement: "Me entusiasma aprender ideas nuevas aunque desafíen mis creencias.", dimension: "O", block: "A", reversed: false, order: 22 },
  { id: "HX23", statement: "Prefiero evitar temas complejos y quedarme con lo conocido.", dimension: "O", block: "A", reversed: true, order: 23 },
  { id: "HX24", statement: "Me incomodan las personas que proponen formas poco tradicionales de hacer las cosas.", dimension: "O", block: "A", reversed: true, order: 24 },

  // --- Bloque B (24 ítems) ---
  { id: "HX25", statement: "Evito exagerar mis logros para impresionar a otros.", dimension: "H", block: "B", reversed: false, order: 1 },
  { id: "HX26", statement: "Me incomoda aprovecharme de alguien, aunque nadie lo note.", dimension: "H", block: "B", reversed: false, order: 2 },
  { id: "HX27", statement: "Si una regla me estorba, suelo buscar cómo saltármela sin consecuencias.", dimension: "H", block: "B", reversed: true, order: 3 },
  { id: "HX28", statement: "Creo que es razonable pedir favores especiales por mi posición o contactos.", dimension: "H", block: "B", reversed: true, order: 4 },
  { id: "HX29", statement: "Me afecta ver a alguien sufrir; tiendo a sentir compasión.", dimension: "E", block: "B", reversed: false, order: 5 },
  { id: "HX30", statement: "En situaciones inciertas, me cuesta dejar de darle vueltas a lo que podría salir mal.", dimension: "E", block: "B", reversed: false, order: 6 },
  { id: "HX31", statement: "Mantengo la cabeza fría incluso cuando otros se asustan.", dimension: "E", block: "B", reversed: true, order: 7 },
  { id: "HX32", statement: "Casi nunca necesito apoyo emocional; prefiero no depender de nadie.", dimension: "E", block: "B", reversed: true, order: 8 },
  { id: "HX33", statement: "Me gusta conocer gente nueva y ampliar mi círculo.", dimension: "X", block: "B", reversed: false, order: 9 },
  { id: "HX34", statement: "Puedo liderar una actividad social sin mucho esfuerzo.", dimension: "X", block: "B", reversed: false, order: 10 },
  { id: "HX35", statement: "Me siento agotado/a después de interactuar con muchas personas.", dimension: "X", block: "B", reversed: true, order: 11 },
  { id: "HX36", statement: "Evito tomar la palabra en grupos grandes.", dimension: "X", block: "B", reversed: true, order: 12 },
  { id: "HX37", statement: "Trato de ser paciente cuando los demás tardan o se equivocan.", dimension: "A", block: "B", reversed: false, order: 13 },
  { id: "HX38", statement: "Busco soluciones donde ambas partes cedan un poco.", dimension: "A", block: "B", reversed: false, order: 14 },
  { id: "HX39", statement: "Me cuesta controlar el enojo cuando alguien no hace lo que prometió.", dimension: "A", block: "B", reversed: true, order: 15 },
  { id: "HX40", statement: "Si alguien me ofende, siento deseos de desquitarme.", dimension: "A", block: "B", reversed: true, order: 16 },
  { id: "HX41", statement: "Reviso mi trabajo para reducir errores antes de entregarlo.", dimension: "C", block: "B", reversed: false, order: 17 },
  { id: "HX42", statement: "Me esfuerzo por terminar lo que empiezo, incluso si se vuelve tedioso.", dimension: "C", block: "B", reversed: false, order: 18 },
  { id: "HX43", statement: "Suelo perder de vista fechas o detalles importantes.", dimension: "C", block: "B", reversed: true, order: 19 },
  { id: "HX44", statement: "Me resulta difícil mantener el orden en mis cosas.", dimension: "C", block: "B", reversed: true, order: 20 },
  { id: "HX45", statement: "Me gusta hacer preguntas para entender cómo y por qué funcionan las cosas.", dimension: "O", block: "B", reversed: false, order: 21 },
  { id: "HX46", statement: "Disfruto imaginar soluciones creativas a problemas cotidianos.", dimension: "O", block: "B", reversed: false, order: 22 },
  { id: "HX47", statement: "No veo utilidad en el arte o la creatividad para la vida diaria.", dimension: "O", block: "B", reversed: true, order: 23 },
  { id: "HX48", statement: "Prefiero seguir métodos probados en vez de experimentar con ideas nuevas.", dimension: "O", block: "B", reversed: true, order: 24 },

  // --- Bloque C (24 ítems) ---
  { id: "HX49", statement: "Si cometo un error que afecta a otros, lo admito aunque me perjudique.", dimension: "H", block: "C", reversed: false, order: 1 },
  { id: "HX50", statement: "Me parece injusto beneficiarme a costa de alguien más.", dimension: "H", block: "C", reversed: false, order: 2 },
  { id: "HX51", statement: "Es normal usar engaños pequeños si ayudan a lograr un objetivo.", dimension: "H", block: "C", reversed: true, order: 3 },
  { id: "HX52", statement: "Me importa mucho tener cosas costosas para que los demás me admiren.", dimension: "H", block: "C", reversed: true, order: 4 },
  { id: "HX53", statement: "Me pongo nervioso/a antes de situaciones con posible riesgo o daño.", dimension: "E", block: "C", reversed: false, order: 5 },
  { id: "HX54", statement: "Siento apego fuerte por personas muy cercanas y me duele la distancia.", dimension: "E", block: "C", reversed: false, order: 6 },
  { id: "HX55", statement: "Casi nunca me preocupan los peligros; confío en que todo saldrá bien.", dimension: "E", block: "C", reversed: true, order: 7 },
  { id: "HX56", statement: "Me cuesta conmoverme con historias emotivas.", dimension: "E", block: "C", reversed: true, order: 8 },
  { id: "HX57", statement: "Me siento cómodo/a expresando mis opiniones en público.", dimension: "X", block: "C", reversed: false, order: 9 },
  { id: "HX58", statement: "Suelo animar a otros y crear buen ambiente en un grupo.", dimension: "X", block: "C", reversed: false, order: 10 },
  { id: "HX59", statement: "En eventos sociales, prefiero mantenerme en un segundo plano.", dimension: "X", block: "C", reversed: true, order: 11 },
  { id: "HX60", statement: "Me cuesta mostrar entusiasmo, incluso cuando me gusta lo que hago.", dimension: "X", block: "C", reversed: true, order: 12 },
  { id: "HX61", statement: "Puedo escuchar críticas sin tomarlo como un ataque personal.", dimension: "A", block: "C", reversed: false, order: 13 },
  { id: "HX62", statement: "Cuando hay conflicto, intento entender la perspectiva de la otra persona.", dimension: "A", block: "C", reversed: false, order: 14 },
  { id: "HX63", statement: "Cuando me molestan, respondo con dureza.", dimension: "A", block: "C", reversed: true, order: 15 },
  { id: "HX64", statement: "Me desespera la gente lenta; pierdo la paciencia rápido.", dimension: "A", block: "C", reversed: true, order: 16 },
  { id: "HX65", statement: "Me gusta planificar con anticipación y cumplir un horario.", dimension: "C", block: "C", reversed: false, order: 17 },
  { id: "HX66", statement: "Soy constante: avanzo aunque la tarea sea difícil.", dimension: "C", block: "C", reversed: false, order: 18 },
  { id: "HX67", statement: "Improviso la mayoría de mis responsabilidades sin un plan claro.", dimension: "C", block: "C", reversed: true, order: 19 },
  { id: "HX68", statement: "Me distraigo con facilidad y dejo cosas a medias.", dimension: "C", block: "C", reversed: true, order: 20 },
  { id: "HX69", statement: "Me atraen temas abstractos como teorías, ideas o debates.", dimension: "O", block: "C", reversed: false, order: 21 },
  { id: "HX70", statement: "Valoro la originalidad, aunque sea distinta a la mayoría.", dimension: "O", block: "C", reversed: false, order: 22 },
  { id: "HX71", statement: "Me siento incómodo/a cuando algo rompe la tradición o las costumbres.", dimension: "O", block: "C", reversed: true, order: 23 },
  { id: "HX72", statement: "Evito aprender cosas nuevas si no las necesito de inmediato.", dimension: "O", block: "C", reversed: true, order: 24 },
];

export function getBlockQuestions(block: HexacoBlock): HexacoQuestion[] {
  return HEXACO_QUESTIONS.filter((q) => q.block === block);
}
