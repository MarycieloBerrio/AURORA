import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sniesService } from "@/services/snies-service";

export const maxDuration = 300; // 5 min — Vercel Pro/Enterprise needed for > 60s

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: "No autorizado." }, { status: 403 });
  }

  try {
    const result = await sniesService.refresh();
    return NextResponse.json({ success: true, inserted: result.inserted });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[snies/refresh] ERROR:", msg, err);
    return NextResponse.json(
      { message: msg || "Error al actualizar SNIES." },
      { status: 500 },
    );
  }
}
