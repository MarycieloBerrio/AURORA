import type { SkillQuestion } from "@/features/assessment/types";
import { SPATIAL_REASONING_ASSETS } from "@/constants/assessment-tests";

const SHARED_OPTIONS = [
  { id: "a", text: "A", imageSrc: SPATIAL_REASONING_ASSETS.optionA },
  { id: "b", text: "B", imageSrc: SPATIAL_REASONING_ASSETS.optionB },
  { id: "c", text: "C", imageSrc: SPATIAL_REASONING_ASSETS.optionC },
  { id: "d", text: "D", imageSrc: SPATIAL_REASONING_ASSETS.optionD },
] as const satisfies SkillQuestion["options"];

export const SPATIAL_REASONING_QUESTIONS: SkillQuestion[] = [
  {
    key: "sr-q1",
    prompt: "Observa el isométrico y selecciona la opción que representa una rotación válida de la misma figura.",
    promptImageSrc: SPATIAL_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "b",
    order: 1,
  },
  {
    key: "sr-q2",
    prompt: "La figura isométrica ha sido rotada en el espacio. ¿Cuál de las opciones corresponde a esa misma figura vista desde otro ángulo?",
    promptImageSrc: SPATIAL_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "a",
    order: 2,
  },
  {
    key: "sr-q3",
    prompt: "Identifica cuál de las imágenes muestra el isométrico tal como quedaría tras aplicarle una rotación en el espacio tridimensional.",
    promptImageSrc: SPATIAL_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "c",
    order: 3,
  },
  {
    key: "sr-q4",
    prompt: "Una de las opciones es la misma figura isométrica rotada. Analiza la forma y el volumen para encontrarla.",
    promptImageSrc: SPATIAL_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "d",
    order: 4,
  },
  {
    key: "sr-q5",
    prompt: "El isométrico ha sido girado en una dirección distinta. ¿Cuál de las siguientes opciones representa ese resultado?",
    promptImageSrc: SPATIAL_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "b",
    order: 5,
  },
  {
    key: "sr-q6",
    prompt: "Observa detenidamente el isométrico y determina cuál opción corresponde a la misma figura tras una rotación en el espacio.",
    promptImageSrc: SPATIAL_REASONING_ASSETS.questionImage,
    options: [...SHARED_OPTIONS],
    correctOptionId: "c",
    order: 6,
  },
];
