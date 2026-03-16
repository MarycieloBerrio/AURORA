import { z } from "zod";

// --- RIASEC ---

export interface RiasecTestResult {
  questions: number;
  date: string;
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export const riasecTestResultSchema = z.object({
  questions: z.number().int().positive(),
  date: z.string().datetime(),
  R: z.number().int().min(0),
  I: z.number().int().min(0),
  A: z.number().int().min(0),
  S: z.number().int().min(0),
  E: z.number().int().min(0),
  C: z.number().int().min(0),
});

// --- HEXACO ---

export interface HexacoTestResult {
  questions: number;
  date: string;
  H: number;
  E: number;
  X: number;
  A: number;
  C: number;
  O: number;
}

export const hexacoTestResultSchema = z.object({
  questions: z.number().int().positive(),
  date: z.string().datetime(),
  H: z.number().int().min(0),
  E: z.number().int().min(0),
  X: z.number().int().min(0),
  A: z.number().int().min(0),
  C: z.number().int().min(0),
  O: z.number().int().min(0),
});

// --- Skill tests ---

export interface SkillTestResult {
  max: number;
  date: string;
  points: number;
}

export const skillTestResultSchema = z.object({
  max: z.number().int().positive(),
  date: z.string().datetime(),
  points: z.number().int().min(0),
});

// --- Computed aggregates (backend) ---

export interface InterestsList {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface PersonalityList {
  H: number;
  E: number;
  X: number;
  A: number;
  C: number;
  O: number;
}

export interface SkillsDict {
  RC: number;
  DR: number;
  IR: number;
  MR: number;
  MM: number;
  PS: number;
  SR: number;
  SA: number;
}

// --- Likert scale (shared) ---

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export const LIKERT_LABELS: Record<LikertValue, string> = {
  1: "Muy en desacuerdo",
  2: "En desacuerdo",
  3: "Neutral",
  4: "De acuerdo",
  5: "Muy de acuerdo",
};

export const LIKERT_OPTIONS: readonly LikertValue[] = [1, 2, 3, 4, 5];

// --- Dimension types ---

export type RiasecDimension = "R" | "I" | "A" | "S" | "E" | "C";
export type HexacoDimension = "H" | "E" | "X" | "A" | "C" | "O";

export const RIASEC_DIMENSIONS: readonly RiasecDimension[] = ["R", "I", "A", "S", "E", "C"];
export const HEXACO_DIMENSIONS: readonly HexacoDimension[] = ["H", "E", "X", "A", "C", "O"];
