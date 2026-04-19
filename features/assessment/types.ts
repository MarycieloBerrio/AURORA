import type { LikertValue } from "@/types/test-results";
import type { RiasecQuestion } from "@/constants/questions/riasec";
import type { HexacoQuestion } from "@/constants/questions/hexaco";

export interface QuestionView {
  key: string;
  statement: string;
  order: number;
}

export function toQuestionView(q: RiasecQuestion | HexacoQuestion): QuestionView {
  return { key: q.id, statement: q.statement, order: q.order };
}

export interface LikertResponsePayload {
  questionKey: string;
  value: LikertValue;
}

// --- Skill test types ---

export interface AnswerOption {
  id: string;
  text: string;
  imageSrc?: string;
}

export interface SkillQuestion {
  key: string;
  prompt: string;
  promptImageSrc?: string;
  options: AnswerOption[];
  correctOptionId: string;
  points?: number;
  order: number;
}

export interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  questions: SkillQuestion[];
}

export type AttentionCellContent =
  | { type: "text"; value: string; italic?: boolean }
  | { type: "image"; src: string; alt: string };

export interface AttentionQuestion {
  key: string;
  gridRows: number;
  gridCols: number;
  distractorContent: AttentionCellContent;
  targetContent: AttentionCellContent;
  points?: number;
  order: number;
}
