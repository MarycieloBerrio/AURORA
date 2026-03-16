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
