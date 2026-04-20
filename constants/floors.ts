import type { RiasecBlock, HexacoBlock } from "@/types/test-results";

export type TestType = "riasec" | "hexaco" | "skill";

export interface FloorTest {
  id: string;
  testField: string;
  testType: TestType;
  labelEs: string;
  color: "indigo" | "amber" | "emerald";
  position: { x: number; y: number };
  block?: RiasecBlock | HexacoBlock;
  timeLimitMinutes?: number;
}

export interface FloorConfig {
  id: string;
  nameEs: string;
  subtitleEs: string;
  imageSrc: string;
  route: string;
  tests: FloorTest[];
  speechEs: string;
}

export function getTestPath(testId: string) {
  return `/app/floor/${testId}`;
}

export function getTestCompletedPath(testId: string) {
  return `/app/floor/${testId}/completed`;
}

export function findTestById(testId: string): { floor: FloorConfig; test: FloorTest } | undefined {
  for (const floor of FLOORS) {
    const test = floor.tests.find((t) => t.id === testId);
    if (test) return { floor, test };
  }
  return undefined;
}

export function getAllTestFields(): string[] {
  return FLOORS.flatMap((f) => f.tests.map((t) => t.testField));
}

export const FLOORS: FloorConfig[] = [
  {
    id: "floor-1",
    nameEs: "La Sala",
    subtitleEs: "Centro de Exploración",
    imageSrc: "/assets/floor.png",
    route: "/app/floor",
    speechEs: "Explora la sala e interactúa con los objetos para completar tus pruebas.",
    tests: [
      // ── Fila 1 (fondo, y≈26) ─────────────────────────────────────────────
      {
        id: "selective-attention",
        testField: "testSelectiveAttention",
        testType: "skill",
        labelEs: "Atención Selectiva",
        color: "emerald",
        position: { x: 24, y: 27 },
        timeLimitMinutes: 12,
      },
      {
        id: "riasec-1",
        testField: "testRiasec1",
        testType: "riasec",
        labelEs: "Intereses I",
        color: "indigo",
        position: { x: 42, y: 27 },
        block: "A",
      },
      {
        id: "deductive-reasoning",
        testField: "testDeductiveReasoning",
        testType: "skill",
        labelEs: "Razonamiento Deductivo",
        color: "emerald",
        position: { x: 60, y: 27 },
        timeLimitMinutes: 15,
      },
      {
        id: "riasec-3",
        testField: "testRiasec3",
        testType: "riasec",
        labelEs: "Intereses III",
        color: "indigo",
        position: { x: 78, y: 27 },
        block: "C",
      },
      // ── Fila 2 (medio-fondo, y≈43) ───────────────────────────────────────
      {
        id: "reading-comprehension",
        testField: "testReadingComprehension",
        testType: "skill",
        labelEs: "Comprensión Lectora",
        color: "emerald",
        position: { x: 20, y: 43 },
        timeLimitMinutes: 15,
      },
      {
        id: "inductive-reasoning",
        testField: "testInductiveReasoning",
        testType: "skill",
        labelEs: "Razonamiento Inductivo",
        color: "emerald",
        position: { x: 48, y: 43 },
      },
      {
        id: "riasec-4",
        testField: "testRiasec4",
        testType: "riasec",
        labelEs: "Intereses IV",
        color: "indigo",
        position: { x: 75, y: 43 },
        block: "D",
      },
      // ── Fila 3 (medio-frente, y≈59) ──────────────────────────────────────
      {
        id: "riasec-2",
        testField: "testRiasec2",
        testType: "riasec",
        labelEs: "Intereses II",
        color: "indigo",
        position: { x: 12, y: 59 },
        block: "B",
      },
      {
        id: "hexaco-1",
        testField: "testHexaco1",
        testType: "hexaco",
        labelEs: "Personalidad I",
        color: "amber",
        position: { x: 35, y: 59 },
        block: "A",
      },
      {
        id: "mathematical-reasoning",
        testField: "testMathematicalReasoning",
        testType: "skill",
        labelEs: "Razonamiento Matemático",
        color: "emerald",
        position: { x: 58, y: 59 },
        timeLimitMinutes: 20,
      },
      {
        id: "hexaco-3",
        testField: "testHexaco3",
        testType: "hexaco",
        labelEs: "Personalidad III",
        color: "amber",
        position: { x: 82, y: 59 },
        block: "C",
      },
      // ── Fila 4 (frente, y≈74) ────────────────────────────────────────────
      {
        id: "spatial-reasoning",
        testField: "testSpatialReasoning",
        testType: "skill",
        labelEs: "Razonamiento Espacial",
        color: "emerald",
        position: { x: 28, y: 74 },
        timeLimitMinutes: 12,
      },
      {
        id: "hexaco-2",
        testField: "testHexaco2",
        testType: "hexaco",
        labelEs: "Personalidad II",
        color: "amber",
        position: { x: 62, y: 74 },
        block: "B",
      },
    ],
  },
];

export const DEFAULT_FLOOR_ID = "floor-1";
export const FLOOR_STORAGE_KEY = "aurora:lastFloorId";
