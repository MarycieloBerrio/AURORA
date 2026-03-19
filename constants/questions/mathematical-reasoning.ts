import type { SkillQuestion } from "@/features/assessment/types";

export const MATHEMATICAL_REASONING_QUESTIONS: SkillQuestion[] = [
  {
    key: "mr-q1",
    prompt: "Si 3x + 7 = 22, ¿cuál es el valor de x?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "5" },
      { id: "c", text: "7" },
      { id: "d", text: "4" },
    ],
    correctOptionId: "b",
    order: 1,
  },
  {
    key: "mr-q2",
    prompt: "Un tren recorre 240 km en 3 horas. ¿Cuál es su velocidad promedio en km/h?",
    options: [
      { id: "a", text: "60 km/h" },
      { id: "b", text: "70 km/h" },
      { id: "c", text: "80 km/h" },
      { id: "d", text: "90 km/h" },
    ],
    correctOptionId: "c",
    order: 2,
  },
  {
    key: "mr-q3",
    prompt: "¿Cuál es el siguiente número en la secuencia: 2, 6, 18, 54, ...?",
    options: [
      { id: "a", text: "108" },
      { id: "b", text: "162" },
      { id: "c", text: "72" },
      { id: "d", text: "216" },
    ],
    correctOptionId: "b",
    order: 3,
  },
  {
    key: "mr-q4",
    prompt: "Si el área de un cuadrado es 144 cm², ¿cuánto mide cada lado?",
    options: [
      { id: "a", text: "10 cm" },
      { id: "b", text: "14 cm" },
      { id: "c", text: "12 cm" },
      { id: "d", text: "16 cm" },
    ],
    correctOptionId: "c",
    order: 4,
  },
  {
    key: "mr-q5",
    prompt: "En una tienda, un artículo cuesta $80. Si tiene un descuento del 25%, ¿cuál es el precio final?",
    options: [
      { id: "a", text: "$55" },
      { id: "b", text: "$60" },
      { id: "c", text: "$65" },
      { id: "d", text: "$70" },
    ],
    correctOptionId: "b",
    order: 5,
  },
  {
    key: "mr-q6",
    prompt: "¿Cuál es el resultado de la expresión: 2³ + 4² - 3¹?",
    options: [
      { id: "a", text: "21" },
      { id: "b", text: "19" },
      { id: "c", text: "23" },
      { id: "d", text: "17" },
    ],
    correctOptionId: "a",
    order: 6,
  },
  {
    key: "mr-q7",
    prompt: "María tiene el doble de edad que Juan. Si la suma de sus edades es 36, ¿cuántos años tiene Juan?",
    options: [
      { id: "a", text: "10 años" },
      { id: "b", text: "12 años" },
      { id: "c", text: "14 años" },
      { id: "d", text: "18 años" },
    ],
    correctOptionId: "b",
    order: 7,
  },
  {
    key: "mr-q8",
    prompt: "Un rectángulo tiene un perímetro de 30 cm. Si su largo es el doble de su ancho, ¿cuánto mide el largo?",
    options: [
      { id: "a", text: "8 cm" },
      { id: "b", text: "10 cm" },
      { id: "c", text: "12 cm" },
      { id: "d", text: "15 cm" },
    ],
    correctOptionId: "b",
    order: 8,
  },
  {
    key: "mr-q9",
    prompt: "Si se lanza un dado justo, ¿cuál es la probabilidad de obtener un número mayor que 4?",
    options: [
      { id: "a", text: "1/6" },
      { id: "b", text: "1/3" },
      { id: "c", text: "1/2" },
      { id: "d", text: "2/3" },
    ],
    correctOptionId: "b",
    order: 9,
  },
  {
    key: "mr-q10",
    prompt: "¿Cuál es el valor de la expresión: (15 × 4) ÷ (10 - 4)?",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "10" },
      { id: "c", text: "12" },
      { id: "d", text: "6" },
    ],
    correctOptionId: "b",
    order: 10,
  },
];
