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

export function getTestPath(floorId: string, testId: string) {
  return `/app/floor/${floorId}/test/${testId}`;
}

export function getTestCompletedPath(floorId: string, testId: string) {
  return `/app/floor/${floorId}/test/${testId}/completed`;
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
    nameEs: "Piso 1",
    subtitleEs: "Sector de Integración",
    imageSrc: "/assets/floor-1-room.png",
    route: "/app/floor/floor-1",
    speechEs: "Explora este piso y completa las pruebas que encuentres.",
    tests: [
      {
        id: "riasec-1",
        testField: "testRiasec1",
        testType: "riasec",
        labelEs: "Intereses I",
        color: "indigo",
        position: { x: 25, y: 35 },
        block: "A",
      },
      {
        id: "hexaco-1",
        testField: "testHexaco1",
        testType: "hexaco",
        labelEs: "Personalidad I",
        color: "amber",
        position: { x: 55, y: 25 },
        block: "A",
      },
      {
        id: "reading-comprehension",
        testField: "testReadingComprehension",
        testType: "skill",
        labelEs: "Comprensión Lectora",
        color: "emerald",
        position: { x: 75, y: 45 },
        timeLimitMinutes: 15,
      },
      {
        id: "deductive-reasoning",
        testField: "testDeductiveReasoning",
        testType: "skill",
        labelEs: "Razonamiento Deductivo",
        color: "emerald",
        position: { x: 40, y: 65 },
      },
    ],
  },
  {
    id: "floor-2",
    nameEs: "Piso 2",
    subtitleEs: "Sector de Exploración",
    imageSrc: "/assets/floor-2-room.png",
    route: "/app/floor/floor-2",
    speechEs: "Explora este piso y completa las pruebas que encuentres.",
    tests: [
      {
        id: "riasec-2",
        testField: "testRiasec2",
        testType: "riasec",
        labelEs: "Intereses II",
        color: "indigo",
        position: { x: 30, y: 30 },
        block: "B",
      },
      {
        id: "hexaco-2",
        testField: "testHexaco2",
        testType: "hexaco",
        labelEs: "Personalidad II",
        color: "amber",
        position: { x: 60, y: 40 },
        block: "B",
      },
      {
        id: "inductive-reasoning",
        testField: "testInductiveReasoning",
        testType: "skill",
        labelEs: "Razonamiento Inductivo",
        color: "emerald",
        position: { x: 80, y: 55 },
      },
      {
        id: "mathematical-reasoning",
        testField: "testMathematicalReasoning",
        testType: "skill",
        labelEs: "Razonamiento Matemático",
        color: "emerald",
        position: { x: 45, y: 70 },
        timeLimitMinutes: 20,
      },
    ],
  },
  {
    id: "floor-3",
    nameEs: "Piso 3",
    subtitleEs: "Sector de Desarrollo",
    imageSrc: "/assets/floor-3-room.png",
    route: "/app/floor/floor-3",
    speechEs: "Explora este piso y completa las pruebas que encuentres.",
    tests: [
      {
        id: "riasec-3",
        testField: "testRiasec3",
        testType: "riasec",
        labelEs: "Intereses III",
        color: "indigo",
        position: { x: 20, y: 40 },
        block: "C",
      },
      {
        id: "hexaco-3",
        testField: "testHexaco3",
        testType: "hexaco",
        labelEs: "Personalidad III",
        color: "amber",
        position: { x: 50, y: 30 },
        block: "C",
      },
      {
        id: "memorization",
        testField: "testMemorization",
        testType: "skill",
        labelEs: "Memorización",
        color: "emerald",
        position: { x: 75, y: 50 },
      },
      {
        id: "perceptual-speed",
        testField: "testPerceptualSpeed",
        testType: "skill",
        labelEs: "Velocidad Perceptual",
        color: "emerald",
        position: { x: 35, y: 65 },
      },
    ],
  },
  {
    id: "floor-4",
    nameEs: "Piso 4",
    subtitleEs: "Sector de Liderazgo",
    imageSrc: "/assets/floor-4-room.png",
    route: "/app/floor/floor-4",
    speechEs: "Explora este piso y completa las pruebas que encuentres.",
    tests: [
      {
        id: "riasec-4",
        testField: "testRiasec4",
        testType: "riasec",
        labelEs: "Intereses IV",
        color: "indigo",
        position: { x: 30, y: 35 },
        block: "D",
      },
      {
        id: "spatial-reasoning",
        testField: "testSpatialReasoning",
        testType: "skill",
        labelEs: "Razonamiento Espacial",
        color: "emerald",
        position: { x: 65, y: 45 },
      },
      {
        id: "selective-attention",
        testField: "testSelectiveAttention",
        testType: "skill",
        labelEs: "Atención Selectiva",
        color: "emerald",
        position: { x: 50, y: 65 },
      },
    ],
  },
];

export const DEFAULT_FLOOR_ID = "floor-1";
export const FLOOR_STORAGE_KEY = "aurora:lastFloorId";
