import { z } from "zod";

// --- Likert scale ---

export type LikertValue = 1 | 2 | 3 | 4 | 5;
export type LikertScaleLabels = Record<LikertValue, string>;

export const HEXACO_LIKERT_LABELS: LikertScaleLabels = {
  1: "Totalmente en desacuerdo",
  2: "En desacuerdo",
  3: "Ni de acuerdo ni en desacuerdo",
  4: "De acuerdo",
  5: "Totalmente de acuerdo",
};

export const RIASEC_LIKERT_LABELS: LikertScaleLabels = {
  1: "No me interesa para nada",
  2: "Me interesa poco",
  3: "Me interesa algo",
  4: "Me interesa bastante",
  5: "Me interesa mucho",
};

export const LIKERT_OPTIONS: readonly LikertValue[] = [1, 2, 3, 4, 5];

// --- Dimension and block types ---

export type RiasecDimension = "R" | "I" | "A" | "S" | "E" | "C";
export type HexacoDimension = "H" | "E" | "X" | "A" | "C" | "O";
export type RiasecBlock = "A" | "B" | "C" | "D";
export type HexacoBlock = "A" | "B" | "C";

export const RIASEC_DIMENSIONS: readonly RiasecDimension[] = ["R", "I", "A", "S", "E", "C"];
export const HEXACO_DIMENSIONS: readonly HexacoDimension[] = ["H", "E", "X", "A", "C", "O"];

// --- RIASEC block result ---

export interface RiasecBlockResult {
  block: RiasecBlock;
  itemCount: number;
  date: string;
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export const riasecBlockResultSchema = z.object({
  block: z.enum(["A", "B", "C", "D"]),
  itemCount: z.number().int().positive(),
  date: z.string().datetime(),
  R: z.number().min(0).max(100),
  I: z.number().min(0).max(100),
  A: z.number().min(0).max(100),
  S: z.number().min(0).max(100),
  E: z.number().min(0).max(100),
  C: z.number().min(0).max(100),
});

// --- HEXACO block result ---

export interface HexacoBlockResult {
  block: HexacoBlock;
  itemCount: number;
  date: string;
  H: number;
  E: number;
  X: number;
  A: number;
  C: number;
  O: number;
}

export const hexacoBlockResultSchema = z.object({
  block: z.enum(["A", "B", "C"]),
  itemCount: z.number().int().positive(),
  date: z.string().datetime(),
  H: z.number().min(0).max(100),
  E: z.number().min(0).max(100),
  X: z.number().min(0).max(100),
  A: z.number().min(0).max(100),
  C: z.number().min(0).max(100),
  O: z.number().min(0).max(100),
});

// --- Skill test result ---

export interface SkillTestResult {
  max: number;
  date: string;
  points: number;
  timeTakenSeconds?: number;
}

export const skillTestResultSchema = z.object({
  max: z.number().int().positive(),
  date: z.string().datetime(),
  points: z.number().int().min(0),
  timeTakenSeconds: z.number().int().min(0).optional(),
});

// --- Computed aggregates ---

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
