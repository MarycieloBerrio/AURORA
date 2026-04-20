import type { SkillQuestion } from "@/features/assessment/types";

const IMG = "/assets/Razonamiento_espacial";

/**
 * Image naming convention (files in public/assets/Razonamiento_Espacial/):
 *   Question image : Q{order}.png
 *   Option images  : Q{order}_{letter}.png  (A | B | C | D)
 *
 * All questions use correctOptionId "a". Options are shuffled at render time,
 * so "a" appears in a random display position each session.
 */

const PROMPT_AP = "Selecciona la figura que corresponde.";

function apQuestion(
  key: string,
  order: number,
  correctLetter: "A" | "B" | "C" | "D",
  otherLetters: ["A" | "B" | "C" | "D", "A" | "B" | "C" | "D", "A" | "B" | "C" | "D"],
  points: number,
): SkillQuestion {
  const base = `${IMG}/Q${order}`;
  return {
    key,
    prompt: PROMPT_AP,
    promptImageSrc: `${base}.png`,
    options: [
      { id: "a", text: correctLetter, imageSrc: `${base}_${correctLetter}.png` },
      { id: "b", text: otherLetters[0], imageSrc: `${base}_${otherLetters[0]}.png` },
      { id: "c", text: otherLetters[1], imageSrc: `${base}_${otherLetters[1]}.png` },
      { id: "d", text: otherLetters[2], imageSrc: `${base}_${otherLetters[2]}.png` },
    ],
    correctOptionId: "a",
    points,
    order,
  };
}


export const SPATIAL_REASONING_QUESTIONS: SkillQuestion[] = [
  apQuestion("sr-q1",  1,  "D", ["A", "B", "C"], 2),
  apQuestion("sr-q2",  2,  "C", ["A", "B", "D"], 2),
  apQuestion("sr-q3",  3,  "B", ["A", "C", "D"], 2),
  apQuestion("sr-q4",  4,  "A", ["B", "C", "D"], 4),
  apQuestion("sr-q5",  5,  "C", ["A", "B", "D"], 2),
  apQuestion("sr-q6",  6,  "A", ["B", "C", "D"], 3),
  apQuestion("sr-q7",  7,  "D", ["A", "B", "C"], 3),
  apQuestion("sr-q8",  8,  "A", ["B", "C", "D"], 4),
  apQuestion("sr-q9",  9,  "B", ["A", "C", "D"], 3),
  apQuestion("sr-q10", 10, "C", ["A", "B", "D"], 3),
  apQuestion("sr-q11", 11, "B", ["A", "C", "D"], 4),
  apQuestion("sr-q12", 12, "A", ["B", "C", "D"], 5),
  apQuestion("sr-q13", 13, "C", ["A", "B", "D"], 4),
  apQuestion("sr-q14", 14, "C", ["A", "B", "D"], 4),
  apQuestion("sr-q15", 15, "B", ["A", "C", "D"], 4),
  apQuestion("sr-q16", 16, "A", ["B", "C", "D"], 5),
];
