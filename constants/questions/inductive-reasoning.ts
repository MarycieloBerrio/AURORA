import type { SkillQuestion } from "@/features/assessment/types";

const IMG = "/assets/Razonamient_Inductivo";

export const INDUCTIVE_REASONING_QUESTIONS: SkillQuestion[] = [
  // Q1 — texto, 2 pts
  {
    key: "ir-q1",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["1", "2", "3"],
      ["2", "3", "4"],
      ["3", "4", "?"],
    ],
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "3" },
      { id: "d", text: "1" },
    ],
    correctOptionId: "a",
    points: 2,
    order: 1,
  },

  // Q2 — imagen, 2 pts
  {
    key: "ir-q2",
    prompt: "¿Cuál es el elemento que falta?",
    promptImageSrc: `${IMG}/Q2_matriz.png`,
    options: [
      { id: "a", text: "A", imageSrc: `${IMG}/Q2_A.png` },
      { id: "b", text: "B", imageSrc: `${IMG}/Q2_B.png` },
      { id: "c", text: "C", imageSrc: `${IMG}/Q2_C.png` },
      { id: "d", text: "D", imageSrc: `${IMG}/Q2_D.png` },
    ],
    correctOptionId: "a",
    points: 2,
    order: 2,
  },

  // Q3 — texto, 3 pts
  {
    key: "ir-q3",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["1", "3", "5"],
      ["2", "4", "6"],
      ["3", "5", "?"],
    ],
    options: [
      { id: "a", text: "7" },
      { id: "b", text: "4" },
      { id: "c", text: "8" },
      { id: "d", text: "9" },
    ],
    correctOptionId: "a",
    points: 3,
    order: 3,
  },

  // Q4 — texto, 3 pts
  {
    key: "ir-q4",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["•▲", "•▲▲", "•▲▲▲"],
      ["■•", "■••", "■•••"],
      ["▲■", "▲■■", "?"],
    ],
    options: [
      { id: "a", text: "▲■■■" },
      { id: "b", text: "▲■■" },
      { id: "c", text: "■■■▲" },
      { id: "d", text: "■▲■■" },
    ],
    correctOptionId: "a",
    points: 3,
    order: 4,
  },

  // Q5 — imagen, 4 pts
  {
    key: "ir-q5",
    prompt: "¿Cuál es el elemento que falta?",
    promptImageSrc: `${IMG}/Q5_matriz.png`,
    options: [
      { id: "a", text: "A", imageSrc: `${IMG}/Q5_A.png` },
      { id: "b", text: "B", imageSrc: `${IMG}/Q5_B.png` },
      { id: "c", text: "C", imageSrc: `${IMG}/Q5_C.png` },
      { id: "d", text: "D", imageSrc: `${IMG}/Q5_D.png` },
    ],
    correctOptionId: "a",
    points: 4,
    order: 5,
  },

  // Q6 — texto, 4 pts
  {
    key: "ir-q6",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["B", "D", "F"],
      ["D", "F", "H"],
      ["F", "H", "?"],
    ],
    options: [
      { id: "a", text: "J" },
      { id: "b", text: "B" },
      { id: "c", text: "D" },
      { id: "d", text: "I" },
    ],
    correctOptionId: "a",
    points: 4,
    order: 6,
  },

  // Q7 — texto, 4 pts
  {
    key: "ir-q7",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["9", "6", "3"],
      ["8", "5", "2"],
      ["7", "4", "?"],
    ],
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "9" },
      { id: "c", text: "3" },
      { id: "d", text: "0" },
    ],
    correctOptionId: "a",
    points: 4,
    order: 7,
  },

  // Q8 — imagen, 4 pts
  {
    key: "ir-q8",
    prompt: "¿Cuál es el elemento que falta?",
    promptImageSrc: `${IMG}/Q8_matriz.png`,
    options: [
      { id: "a", text: "A", imageSrc: `${IMG}/Q8_A.png` },
      { id: "b", text: "B", imageSrc: `${IMG}/Q8_B.png` },
      { id: "c", text: "C", imageSrc: `${IMG}/Q8_C.png` },
      { id: "d", text: "D", imageSrc: `${IMG}/Q8_D.png` },
    ],
    correctOptionId: "a",
    points: 4,
    order: 8,
  },

  // Q9 — texto, 5 pts
  {
    key: "ir-q9",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["•", "▲", "■"],
      ["▲", "■", "•"],
      ["■", "•", "?"],
    ],
    options: [
      { id: "a", text: "▲" },
      { id: "b", text: "■" },
      { id: "c", text: "•" },
      { id: "d", text: "♦" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 9,
  },

  // Q10 — texto, 5 pts
  {
    key: "ir-q10",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["A1", "C2", "E3"],
      ["B1", "D2", "F3"],
      ["C1", "E2", "?"],
    ],
    options: [
      { id: "a", text: "G3" },
      { id: "b", text: "D2" },
      { id: "c", text: "D3" },
      { id: "d", text: "G2" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 10,
  },

  // Q11 — texto, 5 pts
  {
    key: "ir-q11",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["2", "4", "8"],
      ["3", "6", "12"],
      ["4", "8", "?"],
    ],
    options: [
      { id: "a", text: "16" },
      { id: "b", text: "10" },
      { id: "c", text: "14" },
      { id: "d", text: "18" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 11,
  },

  // Q12 — imagen, 5 pts
  {
    key: "ir-q12",
    prompt: "¿Cuál es el elemento que falta?",
    promptImageSrc: `${IMG}/Q12_matriz.png`,
    options: [
      { id: "a", text: "A", imageSrc: `${IMG}/Q12_A.png` },
      { id: "b", text: "B", imageSrc: `${IMG}/Q12_B.png` },
      { id: "c", text: "C", imageSrc: `${IMG}/Q12_C.png` },
      { id: "d", text: "D", imageSrc: `${IMG}/Q12_D.png` },
    ],
    correctOptionId: "a",
    points: 5,
    order: 12,
  },

  // Q13 — texto, 5 pts
  {
    key: "ir-q13",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["A", "B", "D"],
      ["B", "C", "E"],
      ["D", "E", "?"],
    ],
    options: [
      { id: "a", text: "G" },
      { id: "b", text: "B" },
      { id: "c", text: "F" },
      { id: "d", text: "H" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 13,
  },

  // Q14 — texto, 5 pts
  {
    key: "ir-q14",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["•▲", "▲■", "■•"],
      ["▲■", "■•", "•▲"],
      ["■•", "•▲", "?"],
    ],
    options: [
      { id: "a", text: "▲■" },
      { id: "b", text: "▲•" },
      { id: "c", text: "■•" },
      { id: "d", text: "●■" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 14,
  },

  // Q15 — texto, 5 pts
  {
    key: "ir-q15",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["2B", "3C", "4D"],
      ["3C", "4D", "5E"],
      ["4D", "5E", "?"],
    ],
    options: [
      { id: "a", text: "6F" },
      { id: "b", text: "6D" },
      { id: "c", text: "5F" },
      { id: "d", text: "5C" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 15,
  },

  // Q16 — imagen, 5 pts
  {
    key: "ir-q16",
    prompt: "¿Cuál es el elemento que falta?",
    promptImageSrc: `${IMG}/Q16_matriz.png`,
    options: [
      { id: "a", text: "A", imageSrc: `${IMG}/Q16_A.png` },
      { id: "b", text: "B", imageSrc: `${IMG}/Q16_B.png` },
      { id: "c", text: "C", imageSrc: `${IMG}/Q16_C.png` },
      { id: "d", text: "D", imageSrc: `${IMG}/Q16_D.png` },
    ],
    correctOptionId: "a",
    points: 5,
    order: 16,
  },

  // Q17 — texto, 5 pts
  {
    key: "ir-q17",
    prompt: "¿Cuál es el elemento que falta?",
    matrixCells: [
      ["2", "6", "7"],
      ["3", "9", "10"],
      ["4", "12", "?"],
    ],
    options: [
      { id: "a", text: "13" },
      { id: "b", text: "15" },
      { id: "c", text: "17" },
      { id: "d", text: "16" },
    ],
    correctOptionId: "a",
    points: 5,
    order: 17,
  },

  // Q18 — imagen, 5 pts
  {
    key: "ir-q18",
    prompt: "¿Cuál es el elemento que falta?",
    promptImageSrc: `${IMG}/Q18_matriz.png`,
    options: [
      { id: "a", text: "A", imageSrc: `${IMG}/Q18_A.png` },
      { id: "b", text: "B", imageSrc: `${IMG}/Q18_B.png` },
      { id: "c", text: "C", imageSrc: `${IMG}/Q18_C.png` },
      { id: "d", text: "D", imageSrc: `${IMG}/Q18_D.png` },
    ],
    correctOptionId: "a",
    points: 5,
    order: 18,
  },
];
