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
      // Comprensión Lectora → estantería de libros (pared izquierda)
      {
        id: "reading-comprehension",
        testField: "testReadingComprehension",
        testType: "skill",
        labelEs: "Comprensión Lectora",
        color: "emerald",
        position: { x: 20, y: 46 },
        timeLimitMinutes: 15,
      },
      // Atención Selectiva → tablero CONECTA con notas adhesivas
      {
        id: "selective-attention",
        testField: "testSelectiveAttention",
        testType: "skill",
        labelEs: "Atención Selectiva",
        color: "emerald",
        position: { x: 25, y: 30 },
        timeLimitMinutes: 12,
      },
      // Intereses I → tablero de conexiones / mapa de ideas
      {
        id: "riasec-1",
        testField: "testRiasec1",
        testType: "riasec",
        labelEs: "Intereses I",
        color: "indigo",
        position: { x: 38, y: 32 },
        block: "A",
      },
      // Personalidad I → sillones puf (zona social)
      {
        id: "hexaco-1",
        testField: "testHexaco1",
        testType: "hexaco",
        labelEs: "Personalidad I",
        color: "amber",
        position: { x: 23, y: 60 },
        block: "A",
      },
      // Intereses II → mesa de diseño / tableta gráfica
      {
        id: "riasec-2",
        testField: "testRiasec2",
        testType: "riasec",
        labelEs: "Intereses II",
        color: "indigo",
        position: { x: 16, y: 53 },
        block: "B",
      },
      // Personalidad II → micrófono LIVE (expresión social)
      {
        id: "hexaco-2",
        testField: "testHexaco2",
        testType: "hexaco",
        labelEs: "Personalidad II",
        color: "amber",
        position: { x: 37, y: 67 },
        block: "B",
      },
      // Razonamiento Inductivo → mesa de juegos / modelos 3D
      {
        id: "inductive-reasoning",
        testField: "testInductiveReasoning",
        testType: "skill",
        labelEs: "Razonamiento Inductivo",
        color: "emerald",
        position: { x: 46, y: 48 },
      },
      // Razonamiento Matemático → caja registradora / calculadora
      {
        id: "mathematical-reasoning",
        testField: "testMathematicalReasoning",
        testType: "skill",
        labelEs: "Razonamiento Matemático",
        color: "emerald",
        position: { x: 52, y: 64 },
        timeLimitMinutes: 20,
      },
      // Razonamiento Deductivo → pizarrón EXPLORE
      {
        id: "deductive-reasoning",
        testField: "testDeductiveReasoning",
        testType: "skill",
        labelEs: "Razonamiento Deductivo",
        color: "emerald",
        position: { x: 55, y: 29 },
        timeLimitMinutes: 15,
      },
      // Razonamiento Espacial → impresora 3D
      {
        id: "spatial-reasoning",
        testField: "testSpatialReasoning",
        testType: "skill",
        labelEs: "Razonamiento Espacial",
        color: "emerald",
        position: { x: 18, y: 73 },
      },
      // Intereses III → dron (zona STEM / emprendimiento)
      {
        id: "riasec-3",
        testField: "testRiasec3",
        testType: "riasec",
        labelEs: "Intereses III",
        color: "indigo",
        position: { x: 73, y: 23 },
        block: "C",
      },
      // Personalidad III → estación de computadoras
      {
        id: "hexaco-3",
        testField: "testHexaco3",
        testType: "hexaco",
        labelEs: "Personalidad III",
        color: "amber",
        position: { x: 80, y: 57 },
        block: "C",
      },
      // Intereses IV → telescopio
      {
        id: "riasec-4",
        testField: "testRiasec4",
        testType: "riasec",
        labelEs: "Intereses IV",
        color: "indigo",
        position: { x: 88, y: 38 },
        block: "D",
      },
    ],
  },
];

export const DEFAULT_FLOOR_ID = "floor-1";
export const FLOOR_STORAGE_KEY = "aurora:lastFloorId";
