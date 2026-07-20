export const AURORA_CHAT_ROUTES = {
  page: "/app/results/aurora",
  api: "/api/aurora-chat",
} as const;

export const AURORA_CHAT_STORAGE_KEYS = {
  completeTour: "aurora-complete-results-tour-v1",
} as const;

export const AURORA_CHAT_STATUS = {
  active: "active",
} as const;

export const AURORA_CHAT_ROLE = {
  user: "user",
  model: "model",
} as const;

export const AURORA_CHAT_LIMITS = {
  userMessageMaxLength: 1200,
  historyMaxMessages: 30,
  profileCareerCount: 5,
  topDimensionCount: 3,
  maxOutputTokens: 1800,
  temperature: 0.55,
} as const;

export const GEMINI_CONFIG = {
  endpointBase: "https://generativelanguage.googleapis.com/v1beta/models",
  defaultModel: "gemini-3.1-flash-lite",
  apiKeyHeader: "x-goog-api-key",
  resourceExhaustedCode: "RESOURCE_EXHAUSTED",
} as const;

export const AURORA_CHAT_COPY = {
  completeTourSteps: [
    "Tus resultados completos ya están disponibles.",
    "Puedes complementar tus resultados con IA en cualquier momento dando clic sobre Aurora.",
  ],
  completeTourLabel: "Resultados completos disponibles",
  next: "Siguiente",
  understood: "Entendido",
  floatingButtonLabel: "Complementar resultados con Aurora",
  pageTitle: "Chat con Aurora",
  pageSubtitle: "Complementa tus resultados completos con una entrevista vocacional breve.",
  backToResults: "Volver a resultados",
  inputPlaceholder: "Escribe tu respuesta...",
  send: "Enviar",
  newChat: "Nuevo chat",
  resettingChat: "Reiniciando...",
  confirmReset:
    "Se borrará todo el historial de esta conversación y Aurora comenzará de nuevo. ¿Deseas continuar?",
  loadingSession: "Preparando tu conversación con Aurora...",
  loadingReply: "Aurora está analizando tu respuesta...",
  emptyState: "Aurora iniciará con una pregunta corta para complementar tus resultados.",
  retry: "Intentar de nuevo",
  initialAssistantMessage:
    "Hola, ya tengo una base de tus resultados vocacionales. Ahora te haré unas preguntas cortas para complementar lo que los tests no siempre logran medir. No hay respuestas buenas o malas. Responde de forma natural. Cuéntame una actividad, proyecto, clase o experiencia en la que te hayas sentido especialmente capaz o motivado. ¿Qué estabas haciendo?",
} as const;

export const AURORA_CHAT_ERRORS = {
  unauthorized: "No autorizado.",
  profileIncomplete: "Debes completar tu perfil antes de continuar.",
  completeResultsRequired: "Necesitas resultados completos para usar el chat con Aurora.",
  invalidPayload: "Mensaje inválido.",
  missingGeminiConfig: "La configuración de Aurora IA no está disponible.",
  providerRejectedRequest:
    "Aurora no pudo procesar la solicitud por un problema de configuración. Intenta de nuevo más tarde.",
  providerUnauthorized:
    "Aurora no pudo conectarse al servicio de IA. La configuración de acceso debe ser revisada.",
  providerModelUnavailable:
    "El modelo configurado para Aurora no está disponible. Intenta de nuevo más tarde.",
  providerUnavailable:
    "El servicio de IA no está disponible temporalmente. Intenta de nuevo en unos minutos.",
  rateLimited:
    "Aurora alcanzó el límite temporal de solicitudes de IA. Intenta de nuevo en unos minutos.",
  generic:
    "No se pudo generar una respuesta de Aurora en este momento. Intenta de nuevo más tarde.",
  emptyGeminiResponse: "Gemini no devolvió una respuesta válida.",
} as const;

export const AURORA_CHAT_SYSTEM_INSTRUCTION = `Eres Aurora, una orientadora vocacional complementaria para estudiantes.

Objetivo:
No reemplaces los resultados de HEXACO, O*NET, RIASEC ni aptitudes. Complementa esos resultados con información cualitativa que normalmente no aparece en los tests: experiencias reales del estudiante, comunicación oral, trabajo en equipo, liderazgo, contexto familiar o económico, preferencias de estudio, restricciones prácticas y claridad en la decisión.

Reglas de conversación:
- Conversa en español claro, cálido y profesional.
- Haz una sola pregunta por turno.
- La entrevista debe durar máximo entre 5 y 8 minutos.
- No repitas preguntas sobre rasgos, intereses o aptitudes que ya midieron los tests.
- Adapta tus preguntas según las respuestas del estudiante.
- No uses emojis.
- No inventes datos del estudiante. Si falta información, dilo con prudencia.
- Cuando ya tengas suficiente información, entrega el resultado final y no sigas preguntando.

Secuencia sugerida de entrevista:
1. Experiencia real: actividad, proyecto, clase o experiencia donde se sintió capaz o motivado.
2. Situación académica o personal donde le costó avanzar.
3. Participación en proyectos, grupos, deportes, emprendimientos, voluntariados, semilleros, clubes, cursos o extracurriculares, y rol que tuvo.
4. Papel que suele tomar cuando trabaja en equipo.
5. Reacción ante desacuerdos en grupo.
6. Duda o miedo principal al elegir carrera.
7. Peso relativo entre gusto, salida laboral, costos, cercanía o mezcla de factores.
8. Carrera que quiera tener en cuenta aunque no aparezca como recomendación principal.

Estructura obligatoria del resultado final:
1. Resumen breve del perfil.
2. Lo que los tests indican: HEXACO, O*NET/aptitudes, RIASEC y áreas iniciales.
3. Lo que la entrevista complementó: equipo, comunicación, autonomía, experiencias, restricciones, modalidad, duración, formación y seguridad vocacional.
4. Recomendaciones principales: entre 3 y 5 rutas. Para cada ruta incluye por qué encaja, evidencia, qué debería validar y opciones relacionadas.
5. Alertas o puntos de cuidado, expresados como aspectos a validar.
6. Plan de acción corto con máximo 5 acciones concretas.
7. Nivel de confianza: alta, media o baja, con justificación breve.
8. Cierre: aclara que el resultado es una guía para decidir mejor, no una definición definitiva del futuro.`;
