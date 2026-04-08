import type { SkillQuestion } from "@/features/assessment/types";
import { DEDUCTIVE_REASONING_ASSETS } from "@/constants/assessment-tests";

const SHARED_OPTIONS = [
  { id: "a", text: "A", imageSrc: DEDUCTIVE_REASONING_ASSETS.optionA },
  { id: "b", text: "B", imageSrc: DEDUCTIVE_REASONING_ASSETS.optionB },
  { id: "c", text: "C", imageSrc: DEDUCTIVE_REASONING_ASSETS.optionC },
  { id: "d", text: "D", imageSrc: DEDUCTIVE_REASONING_ASSETS.optionD },
] as const satisfies SkillQuestion["options"];

export const DEDUCTIVE_REASONING_QUESTIONS: SkillQuestion[] = [
  {
    key: "dr-q1",
    prompt: "Analiza la figura y aplica la regla lógica que rige la secuencia. ¿Cuál de las opciones es la conclusión correcta?",
    promptImageSrc: DEDUCTIVE_REASONING_ASSETS.questionImage1,
    options: [...SHARED_OPTIONS],
    correctOptionId: "c",
    order: 1,
  },
  {
    key: "dr-q2",
    prompt: "Observa los elementos de la figura y deduce qué relación los vincula. Selecciona la opción que sigue de forma lógica.",
    promptImageSrc: DEDUCTIVE_REASONING_ASSETS.questionImage2,
    options: [...SHARED_OPTIONS],
    correctOptionId: "a",
    order: 2,
  },
  {
    key: "dr-q3",
    prompt: "Si las premisas de la figura son verdaderas, ¿cuál de las opciones se deriva necesariamente de ellas?",
    promptImageSrc: DEDUCTIVE_REASONING_ASSETS.questionImage1,
    options: [...SHARED_OPTIONS],
    correctOptionId: "d",
    order: 3,
  },
  {
    key: "dr-q4",
    prompt: "Identifica el principio lógico que conecta los elementos de la figura y elige la opción que lo respeta.",
    promptImageSrc: DEDUCTIVE_REASONING_ASSETS.questionImage2,
    options: [...SHARED_OPTIONS],
    correctOptionId: "b",
    order: 4,
  },
  {
    key: "dr-q5",
    prompt: "A partir de la información presentada, ¿cuál es la única conclusión que puede deducirse con certeza?",
    promptImageSrc: DEDUCTIVE_REASONING_ASSETS.questionImage1,
    options: [...SHARED_OPTIONS],
    correctOptionId: "c",
    order: 5,
  },
  {
    key: "dr-q6",
    prompt: "Examina la figura y selecciona la opción que completa el razonamiento deductivo de manera válida.",
    promptImageSrc: DEDUCTIVE_REASONING_ASSETS.questionImage2,
    options: [...SHARED_OPTIONS],
    correctOptionId: "a",
    order: 6,
  },
];
