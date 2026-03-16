"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FLOORS, DEFAULT_FLOOR_ID, FLOOR_STORAGE_KEY } from "@/constants/floors";
import { getFloorById } from "@/lib/floor-helpers";

export function FloorRedirect() {
  const router = useRouter();

  useEffect(() => {
    const lastId = localStorage.getItem(FLOOR_STORAGE_KEY) ?? DEFAULT_FLOOR_ID;
    const floor = getFloorById(lastId) ?? FLOORS[0];
    router.replace(floor.route);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-slate-400">Cargando…</p>
    </div>
  );
}
