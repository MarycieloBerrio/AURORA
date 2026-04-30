import { NextResponse } from "next/server";
import { after } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { ofertaService, SYNC_GEOCODE_LIMIT } from "@/services/oferta-service";

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
    let offerings = await ofertaService.getOfferingsForProgram(programa);

    const needsGeocoding = offerings.some(
      (o) => o.lat === null && o.codigomunicipioprograma,
    );

    if (needsGeocoding) {
      // Geocode up to SYNC_GEOCODE_LIMIT municipalities synchronously so pins
      // appear on the very first load (≈ 15 × 250 ms ≈ 3.75 s max overhead).
      await ofertaService.geocodePendingMunicipalities(offerings, SYNC_GEOCODE_LIMIT);

      // Re-fetch: Location table now has coordinates for the geocoded codes.
      offerings = await ofertaService.getOfferingsForProgram(programa);

      // Geocode any remaining municipalities in the background.
      after(() => {
        ofertaService
          .geocodePendingMunicipalities(offerings)
          .catch(console.error);
      });
    }

    return NextResponse.json({ offerings, programKey: programa });
  } catch {
    return NextResponse.json(
      { message: "Error al consultar la oferta académica." },
      { status: 500 },
    );
  }
}
