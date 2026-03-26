import type { RiasecDimension, RiasecBlock } from "@/types/test-results";

export type { RiasecBlock };

export interface RiasecQuestion {
  id: string;
  statement: string;
  dimension: RiasecDimension;
  block: RiasecBlock;
  reversed: boolean;
  order: number;
}

export const RIASEC_QUESTIONS: RiasecQuestion[] = [
  // --- Bloque A (18 ítems) ---
  { id: "RX01", statement: "Reparar o ensamblar objetos usando herramientas (por ejemplo, muebles o equipos).", dimension: "R", block: "A", reversed: false, order: 1 },
  { id: "RX02", statement: "Trabajar al aire libre instalando o manteniendo infraestructura o equipos.", dimension: "R", block: "A", reversed: false, order: 2 },
  { id: "RX03", statement: "Me desagrada usar herramientas o trabajar con materiales como madera o metal.", dimension: "R", block: "A", reversed: true, order: 3 },
  { id: "RX04", statement: "Analizar datos para encontrar patrones y responder preguntas.", dimension: "I", block: "A", reversed: false, order: 4 },
  { id: "RX05", statement: "Diseñar una prueba o experimento para comprobar una idea.", dimension: "I", block: "A", reversed: false, order: 5 },
  { id: "RX06", statement: "Evito tareas que requieren investigar con detalle antes de decidir.", dimension: "I", block: "A", reversed: true, order: 6 },
  { id: "RX07", statement: "Crear diseños visuales (afiches, presentaciones, ilustraciones) para comunicar una idea.", dimension: "A", block: "A", reversed: false, order: 7 },
  { id: "RX08", statement: "Escribir historias, guiones o textos creativos.", dimension: "A", block: "A", reversed: false, order: 8 },
  { id: "RX09", statement: "Me incomoda trabajar en tareas creativas sin instrucciones claras.", dimension: "A", block: "A", reversed: true, order: 9 },
  { id: "RX10", statement: "Enseñar o capacitar a otras personas en un tema.", dimension: "S", block: "A", reversed: false, order: 10 },
  { id: "RX11", statement: "Acompañar a alguien para que supere una dificultad o tome una decisión.", dimension: "S", block: "A", reversed: false, order: 11 },
  { id: "RX12", statement: "Prefiero evitar trabajos en los que deba escuchar problemas personales.", dimension: "S", block: "A", reversed: true, order: 12 },
  { id: "RX13", statement: "Convencer a otras personas de apoyar un proyecto o propuesta.", dimension: "E", block: "A", reversed: false, order: 13 },
  { id: "RX14", statement: "Negociar acuerdos para lograr objetivos en un equipo u organización.", dimension: "E", block: "A", reversed: false, order: 14 },
  { id: "RX15", statement: "Me incomoda persuadir o vender; prefiero no influir en otros.", dimension: "E", block: "A", reversed: true, order: 15 },
  { id: "RX16", statement: "Organizar información en listas, archivos o sistemas de registro.", dimension: "C", block: "A", reversed: false, order: 16 },
  { id: "RX17", statement: "Seguir procedimientos para mantener documentos y datos en orden.", dimension: "C", block: "A", reversed: false, order: 17 },
  { id: "RX18", statement: "Me aburre el trabajo de oficina con reglas y tareas repetitivas.", dimension: "C", block: "A", reversed: true, order: 18 },

  // --- Bloque B (18 ítems) ---
  { id: "RX19", statement: "Usar maquinaria o equipos para producir, construir o dar mantenimiento.", dimension: "R", block: "B", reversed: false, order: 1 },
  { id: "RX20", statement: "Resolver fallas prácticas (por ejemplo, arreglar una instalación o un aparato).", dimension: "R", block: "B", reversed: false, order: 2 },
  { id: "RX21", statement: "Me resulta poco atractivo un trabajo que implique actividad física o hands-on.", dimension: "R", block: "B", reversed: true, order: 3 },
  { id: "RX22", statement: "Resolver problemas lógicos o matemáticos paso a paso.", dimension: "I", block: "B", reversed: false, order: 4 },
  { id: "RX23", statement: "Leer artículos o reportes técnicos para entender un tema a fondo.", dimension: "I", block: "B", reversed: false, order: 5 },
  { id: "RX24", statement: "Me desespera analizar información; prefiero actuar sin tanta evidencia.", dimension: "I", block: "B", reversed: true, order: 6 },
  { id: "RX25", statement: "Componer o seleccionar música/sonido para crear un ambiente.", dimension: "A", block: "B", reversed: false, order: 7 },
  { id: "RX26", statement: "Probar ideas nuevas en fotografía, video o edición.", dimension: "A", block: "B", reversed: false, order: 8 },
  { id: "RX27", statement: "Prefiero trabajos donde se repita el mismo procedimiento, sin improvisar.", dimension: "A", block: "B", reversed: true, order: 9 },
  { id: "RX28", statement: "Facilitar conversaciones para que un grupo llegue a acuerdos.", dimension: "S", block: "B", reversed: false, order: 10 },
  { id: "RX29", statement: "Organizar actividades de apoyo o voluntariado para ayudar a otros.", dimension: "S", block: "B", reversed: false, order: 11 },
  { id: "RX30", statement: "Evito roles donde debo orientar o cuidar a otras personas.", dimension: "S", block: "B", reversed: true, order: 12 },
  { id: "RX31", statement: "Presentar ideas en público para movilizar a un grupo.", dimension: "E", block: "B", reversed: false, order: 13 },
  { id: "RX32", statement: "Tomar decisiones rápidas cuando se requiere liderazgo.", dimension: "E", block: "B", reversed: false, order: 14 },
  { id: "RX33", statement: "Me estresa liderar; prefiero no asumir responsabilidades de dirección.", dimension: "E", block: "B", reversed: true, order: 15 },
  { id: "RX34", statement: "Revisar y corregir registros (por ejemplo, inventarios o facturas).", dimension: "C", block: "B", reversed: false, order: 16 },
  { id: "RX35", statement: "Coordinar agendas, plazos y detalles para que todo esté en orden.", dimension: "C", block: "B", reversed: false, order: 17 },
  { id: "RX36", statement: "Me cuesta seguir reglas de organización; prefiero un estilo flexible y sin estructura.", dimension: "C", block: "B", reversed: true, order: 18 },

  // --- Bloque C (18 ítems) ---
  { id: "RX37", statement: "Aprender a usar herramientas nuevas para hacer arreglos en casa o en el trabajo.", dimension: "R", block: "C", reversed: false, order: 1 },
  { id: "RX38", statement: "Trabajar con plantas, animales o materiales naturales como parte de una actividad.", dimension: "R", block: "C", reversed: false, order: 2 },
  { id: "RX39", statement: "Me disgusta el trabajo manual; prefiero tareas puramente intelectuales.", dimension: "R", block: "C", reversed: true, order: 3 },
  { id: "RX40", statement: "Programar, depurar o automatizar procesos para mejorar resultados.", dimension: "I", block: "C", reversed: false, order: 4 },
  { id: "RX41", statement: "Comparar hipótesis y elegir la explicación más sólida.", dimension: "I", block: "C", reversed: false, order: 5 },
  { id: "RX42", statement: "No disfruto estudiar teorías; prefiero tareas concretas sin mucha reflexión.", dimension: "I", block: "C", reversed: true, order: 6 },
  { id: "RX43", statement: "Diseñar una experiencia (evento, campaña, producto) con un estilo propio.", dimension: "A", block: "C", reversed: false, order: 7 },
  { id: "RX44", statement: "Improvisar y probar combinaciones originales para crear algo nuevo.", dimension: "A", block: "C", reversed: false, order: 8 },
  { id: "RX45", statement: "Me incomoda la ambigüedad creativa; necesito reglas estrictas para trabajar.", dimension: "A", block: "C", reversed: true, order: 9 },
  { id: "RX46", statement: "Guiar a una persona para que aprenda una habilidad o mejore su desempeño.", dimension: "S", block: "C", reversed: false, order: 10 },
  { id: "RX47", statement: "Detectar lo que alguien necesita y ofrecer ayuda de forma respetuosa.", dimension: "S", block: "C", reversed: false, order: 11 },
  { id: "RX48", statement: "Me agota interactuar para ayudar; prefiero no trabajar con necesidades ajenas.", dimension: "S", block: "C", reversed: true, order: 12 },
  { id: "RX49", statement: "Identificar oportunidades y proponer iniciativas para crecer o mejorar un negocio.", dimension: "E", block: "C", reversed: false, order: 13 },
  { id: "RX50", statement: "Coordinar recursos y personas para cumplir metas ambiciosas.", dimension: "E", block: "C", reversed: false, order: 14 },
  { id: "RX51", statement: "Evito situaciones donde debo competir o negociar por resultados.", dimension: "E", block: "C", reversed: true, order: 15 },
  { id: "RX52", statement: "Clasificar información según categorías para que sea fácil encontrarla.", dimension: "C", block: "C", reversed: false, order: 16 },
  { id: "RX53", statement: "Disfruto trabajar con números, verificación y consistencia en los datos.", dimension: "C", block: "C", reversed: false, order: 17 },
  { id: "RX54", statement: "Me frustra llevar controles y registros; prefiero tareas abiertas y cambiantes.", dimension: "C", block: "C", reversed: true, order: 18 },

  // --- Bloque D (18 ítems) ---
  { id: "RX55", statement: "Armar, instalar o configurar equipos siguiendo instrucciones técnicas.", dimension: "R", block: "D", reversed: false, order: 1 },
  { id: "RX56", statement: "Manejar herramientas digitales o físicas para operar un proceso (por ejemplo, impresión, corte, medición).", dimension: "R", block: "D", reversed: false, order: 2 },
  { id: "RX57", statement: "Evito tareas donde hay que manipular objetos, equipos o materiales.", dimension: "R", block: "D", reversed: true, order: 3 },
  { id: "RX58", statement: "Investigar varias fuentes para tomar una decisión informada.", dimension: "I", block: "D", reversed: false, order: 4 },
  { id: "RX59", statement: "Crear modelos o esquemas para explicar un fenómeno o un resultado.", dimension: "I", block: "D", reversed: false, order: 5 },
  { id: "RX60", statement: "Me aburre buscar evidencia; prefiero quedarme con la primera respuesta.", dimension: "I", block: "D", reversed: true, order: 6 },
  { id: "RX61", statement: "Crear contenido (texto, audio, visual) para expresar una emoción o una idea.", dimension: "A", block: "D", reversed: false, order: 7 },
  { id: "RX62", statement: "Explorar estilos y referencias para desarrollar una propuesta original.", dimension: "A", block: "D", reversed: false, order: 8 },
  { id: "RX63", statement: "Considero inútil dedicar tiempo a actividades artísticas o expresivas.", dimension: "A", block: "D", reversed: true, order: 9 },
  { id: "RX64", statement: "Mediar en un conflicto para que las personas se entiendan mejor.", dimension: "S", block: "D", reversed: false, order: 10 },
  { id: "RX65", statement: "Diseñar actividades para que otras personas aprendan y se sientan incluidas.", dimension: "S", block: "D", reversed: false, order: 11 },
  { id: "RX66", statement: "Prefiero trabajos donde no tenga que atender preguntas o emociones de otras personas.", dimension: "S", block: "D", reversed: true, order: 12 },
  { id: "RX67", statement: "Liderar una campaña o proyecto para lograr que otros se sumen.", dimension: "E", block: "D", reversed: false, order: 13 },
  { id: "RX68", statement: "Tener conversaciones difíciles (por ejemplo, acuerdos, precios, prioridades) para avanzar.", dimension: "E", block: "D", reversed: false, order: 14 },
  { id: "RX69", statement: "Me incomoda asumir el papel de líder o portavoz.", dimension: "E", block: "D", reversed: true, order: 15 },
  { id: "RX70", statement: "Seguir un plan de trabajo con pasos definidos y revisar que se cumpla.", dimension: "C", block: "D", reversed: false, order: 16 },
  { id: "RX71", statement: "Preparar reportes con datos claros y bien ordenados.", dimension: "C", block: "D", reversed: false, order: 17 },
  { id: "RX72", statement: "Evito tareas de organización; prefiero no trabajar con procedimientos.", dimension: "C", block: "D", reversed: true, order: 18 },
];

export function getBlockQuestions(block: RiasecBlock): RiasecQuestion[] {
  return RIASEC_QUESTIONS.filter((q) => q.block === block);
}
