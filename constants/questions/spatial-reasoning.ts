import type { SkillQuestion } from "@/features/assessment/types";

const IMG = "/assets/Razonamient_Espacial";

/**
 * Ability Profiler Part 3 image paths follow the convention:
 *   Question image : PP{N}.png
 *   Option images  : PP{N}_{original_letter}.png  (A | B | C | D)
 *
 * Shepard-Metzler questions have no images yet — options render as text labels.
 *
 * All questions use correctOptionId "a". Options are shuffled at render time by
 * ImageReasoningTest, so "a" appears in a random display position each session.
 */

const PROMPT_AP = "Selecciona la figura que corresponde.";
const PROMPT_SM = "Determina a cuál figura corresponde la figura tridimensional vista desde otro ángulo.";

function apQuestion(
  key: string,
  problemNumber: number,
  correctLetter: "A" | "B" | "C" | "D",
  otherLetters: ["A" | "B" | "C" | "D", "A" | "B" | "C" | "D", "A" | "B" | "C" | "D"],
  points: number,
  order: number,
): SkillQuestion {
  const base = `${IMG}/PP${problemNumber}`;
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

function smQuestion(
  key: string,
  correctLabel: string,
  otherLabels: [string, string, string],
  points: number,
  order: number,
): SkillQuestion {
  return {
    key,
    prompt: PROMPT_SM,
    options: [
      { id: "a", text: correctLabel },
      { id: "b", text: otherLabels[0] },
      { id: "c", text: otherLabels[1] },
      { id: "d", text: otherLabels[2] },
    ],
    correctOptionId: "a",
    points,
    order,
  };
}

export const SPATIAL_REASONING_QUESTIONS: SkillQuestion[] = [
  apQuestion("sr-q1",  1,  "D", ["A", "B", "C"], 2, 1),
  apQuestion("sr-q2",  2,  "C", ["A", "B", "D"], 2, 2),
  apQuestion("sr-q3",  4,  "B", ["A", "C", "D"], 2, 3),
  smQuestion("sr-q4",  "1B", ["2A", "2D", "2E"],  4, 4),
  apQuestion("sr-q5",  5,  "C", ["A", "B", "D"], 2, 5),
  apQuestion("sr-q6",  3,  "A", ["B", "C", "D"], 3, 6),
  apQuestion("sr-q7",  6,  "D", ["A", "B", "C"], 3, 7),
  smQuestion("sr-q8",  "1B", ["2A", "2B", "2C"],  4, 8),
  apQuestion("sr-q9",  12, "B", ["A", "C", "D"], 3, 9),
  apQuestion("sr-q10", 13, "C", ["A", "B", "D"], 3, 10),
  apQuestion("sr-q11", 9,  "B", ["A", "C", "D"], 4, 11),
  smQuestion("sr-q12", "1D", ["2A", "2B", "2C"],  5, 12),
  apQuestion("sr-q13", 16, "C", ["A", "B", "D"], 4, 13),
  apQuestion("sr-q14", 18, "C", ["A", "B", "D"], 4, 14),
  apQuestion("sr-q15", 19, "B", ["A", "C", "D"], 4, 15),
  smQuestion("sr-q16", "1C", ["2A", "2D", "2E"],  5, 16),
];
