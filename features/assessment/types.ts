import type { LikertValue } from "@/types/test-results";

export interface QuestionView {
  key: string;
  statement: string;
  order: number;
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
  order: number;
}

export interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  questions: SkillQuestion[];
}
