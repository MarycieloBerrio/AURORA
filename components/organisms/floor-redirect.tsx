"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function FloorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/app/floor");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-slate-400">Cargando…</p>
    </div>
  );
}
