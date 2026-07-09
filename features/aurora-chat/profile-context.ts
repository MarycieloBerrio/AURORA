import type { CareerWithAffinity } from "@/constants/careers";
import type { ResultsProfile } from "@/features/results/lib/results-profile";
import { formatScore } from "@/features/results/lib/result-tier";
import { AURORA_CHAT_LIMITS } from "@/features/aurora-chat/constants";
import type { HexacoDimension, RiasecDimension } from "@/types/test-results";
import { HEXACO_DIMENSIONS, RIASEC_DIMENSIONS } from "@/types/test-results";

const RIASEC_LABELS: Record<RiasecDimension, string> = {
  R: "Realista",
  I: "Investigativo",
  A: "Artístico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

const HEXACO_LABELS: Record<HexacoDimension, string> = {
  H: "Honestidad-Humildad",
  E: "Emocionalidad",
  X: "Extroversión",
  A: "Amabilidad",
  C: "Conciencia",
  O: "Apertura a la experiencia",
};

const SKILL_LABELS = {
  RC: "Comprensión lectora",
  DR: "Razonamiento deductivo",
  IR: "Razonamiento inductivo",
  MR: "Razonamiento matemático",
  SR: "Razonamiento espacial",
  SA: "Atención selectiva",
} as const;

function topScores<T extends string>(entries: Array<[T, number]>): Array<[T, number]> {
  return [...entries]
    .sort((a, b) => b[1] - a[1])
    .slice(0, AURORA_CHAT_LIMITS.topDimensionCount);
}

function formatPercent(value: number): string {
  return `${formatScore(value)}%`;
}

function formatUnitScore(value: number): string {
  return formatPercent(value * 100);
}

function formatCareers(careers: CareerWithAffinity[]): string {
  return careers
    .slice(0, AURORA_CHAT_LIMITS.profileCareerCount)
    .map((career, index) => `${index + 1}. ${career.title} (${formatPercent(career.affinity)} de afinidad)`)
    .join("\n");
}

export function buildAuroraProfileContext(profile: ResultsProfile): string {
  const riasec = topScores(RIASEC_DIMENSIONS.map((dimension) => [dimension, profile.interests[dimension]]));
  const hexaco = topScores(HEXACO_DIMENSIONS.map((dimension) => [dimension, profile.personality[dimension]]));
  const skills = topScores(
    (Object.keys(SKILL_LABELS) as Array<keyof typeof SKILL_LABELS>).map((skill) => [skill, profile.skills[skill]]),
  );

  return `Contexto del estudiante según los resultados completos de Aurora:

RIASEC más altos:
${riasec.map(([dimension, score]) => `- ${RIASEC_LABELS[dimension]}: ${formatPercent(score)}`).join("\n")}

HEXACO más altos:
${hexaco.map(([dimension, score]) => `- ${HEXACO_LABELS[dimension]}: ${formatPercent(score)}`).join("\n")}

Aptitudes más altas:
${skills.map(([skill, score]) => `- ${SKILL_LABELS[skill]}: ${formatUnitScore(score)}`).join("\n")}

Carreras recomendadas por el algoritmo:
${formatCareers(profile.careers)}

Usa este contexto como base. No lo trates como diagnóstico definitivo y no vuelvas a medir estas dimensiones mediante preguntas directas.`;
}
