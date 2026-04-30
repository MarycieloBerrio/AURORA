import { NextResponse } from "next/server";
import { after } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { ofertaService } from "@/services/oferta-service";

const querySchema = z.object({
  programa: z.string().min(1).max(200),
});

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ programa: searchParams.get("programa") });

  if (!parsed.success) {
    return NextResponse.json({ message: "Parámetro inválido." }, { status: 400 });
  }

  const { programa } = parsed.data;

  try {
    const offerings = await ofertaService.getOfferingsForProgram(programa);

    after(() => {
      ofertaService.geocodePendingMunicipalities(offerings).catch(console.error);
    });

    return NextResponse.json({ offerings, programKey: programa });
  } catch {
    return NextResponse.json(
      { message: "Error al consultar la oferta académica." },
      { status: 500 },
    );
  }
}
