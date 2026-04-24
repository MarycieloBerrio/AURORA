import { prisma } from "@/lib/prisma";
import { NOMINATIM_BASE_URL, NOMINATIM_DELAY_MS } from "@/constants/socrata";

export interface GeoCoords {
  lat: number;
  lng: number;
}

async function fetchFromNominatim(
  institutionName: string,
  municipality: string,
): Promise<GeoCoords | null> {
  const url = new URL(NOMINATIM_BASE_URL);
  url.searchParams.set("q", `${institutionName} ${municipality} Colombia`);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), {
    headers: { "User-Agent": "AuroraVocationalApp/1.0 (academic)" },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const results: Array<{ lat: string; lon: string }> = await response.json();
  if (results.length === 0) return null;

  return {
    lat: parseFloat(results[0].lat),
    lng: parseFloat(results[0].lon),
  };
}

export const geocodingService = {
  async geocodeInstitution(
    institutionName: string,
    municipality: string,
  ): Promise<GeoCoords | null> {
    const cached = await prisma.geocodedInstitution.findUnique({
      where: {
        institutionName_municipality: { institutionName, municipality },
      },
    });

    if (cached) {
      return { lat: cached.lat, lng: cached.lng };
    }

    await new Promise((resolve) => setTimeout(resolve, NOMINATIM_DELAY_MS));

    const coords = await fetchFromNominatim(institutionName, municipality);
    if (!coords) return null;

    await prisma.geocodedInstitution.upsert({
      where: {
        institutionName_municipality: { institutionName, municipality },
      },
      update: { lat: coords.lat, lng: coords.lng, geocodedAt: new Date() },
      create: { institutionName, municipality, lat: coords.lat, lng: coords.lng },
    });

    return coords;
  },
};
