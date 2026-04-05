import type { SkillQuestion } from "@/features/assessment/types";
import { INDUCTIVE_REASONING_ASSETS } from "@/constants/assessment-tests";

const SHARED_OPTIONS = [
  { id: "a", text: "A", imageSrc: INDUCTIVE_REASONING_ASSETS.optionA },
  { id: "b", text: "B", imageSrc: INDUCTIVE_REASONING_ASSETS.optionB },
  { id: "c", text: "C", imageSrc: INDUCTIVE_REASONING_ASSETS.optionC },
  { id: "d", text: "D", imageSrc: INDUCTIVE_REASONING_ASSETS.optionD },
] as const satisfies SkillQuestion["options"];

export const INDUCTIVE_REASONING_QUESTIONS: SkillQuestion[] = [
  {
    key: "ir-q1",
    prompt: "Observa el patrón de la matriz e identifica cuál de las opciones completa correctamente la pieza faltante.",
    promptImageSrc: INDUCTIVE_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "c",
    order: 1,
  },
  {
    key: "ir-q2",
    prompt: "Analiza la secuencia lógica de las filas y columnas. ¿Qué figura debe ocupar el espacio en blanco?",
    promptImageSrc: INDUCTIVE_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "a",
    order: 2,
  },
  {
    key: "ir-q3",
    prompt: "Cada fila y columna sigue una regla de transformación. Selecciona la figura que completa la matriz respetando esa regla.",
    promptImageSrc: INDUCTIVE_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "d",
    order: 3,
  },
  {
    key: "ir-q4",
    prompt: "Identifica el patrón de cambio entre elementos y determina cuál opción encaja en la posición indicada.",
    promptImageSrc: INDUCTIVE_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "b",
    order: 4,
  },
  {
    key: "ir-q5",
    prompt: "Observa cómo varía la figura en cada dirección de la matriz y selecciona la pieza que completa el patrón.",
    promptImageSrc: INDUCTIVE_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "c",
    order: 5,
  },
  {
    key: "ir-q6",
    prompt: "La matriz sigue una lógica de progresión visual. ¿Cuál de las opciones es la que falta para completarla correctamente?",
    promptImageSrc: INDUCTIVE_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "a",
    order: 6,
  },
];
