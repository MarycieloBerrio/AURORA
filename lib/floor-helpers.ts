import { FLOORS, type FloorConfig, type FloorTest } from "@/constants/floors";

export function getFloorById(floorId: string): FloorConfig | undefined {
  return FLOORS.find((f) => f.id === floorId);
}

export function getFloorIndex(floorId: string): number {
  return FLOORS.findIndex((f) => f.id === floorId);
}

export function isValidFloorId(floorId: string): boolean {
  return FLOORS.some((f) => f.id === floorId);
}

export function getFloorTest(floorId: string, testId: string): FloorTest | undefined {
  const floor = getFloorById(floorId);
  return floor?.tests.find((t) => t.id === testId);
}
