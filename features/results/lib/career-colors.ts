import type { CareerWithAffinity } from "@/constants/careers";

export const CAREER_COLORS = ["#8b5cf6", "#f43f5e", "#10b981"] as const;
export const MAX_SELECTED_CAREERS = 3;

export interface CareerOverlay {
  career: CareerWithAffinity;
  color: string;
}
