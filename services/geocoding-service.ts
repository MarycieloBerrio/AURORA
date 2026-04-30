import { prisma } from "@/lib/prisma";
import { NOMINATIM_BASE_URL, NOMINATIM_DELAY_MS } from "@/constants/socrata";

export interface GeoCoords {
  lat: number;
  lng: number;
}

async function fetchFromNominatim(query: string): Promise<GeoCoords | null> {
  const url = new URL(NOMINATIM_BASE_URL);
  url.searchParams.set("q", query);
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
  async geocodeLocation(
    codeLocation: string,
    municipalityName: string,
    departmentName: string,
  ): Promise<GeoCoords | null> {
    const cached = await prisma.location.findUnique({
      where: { codeLocation },
    });

    if (cached?.lat !== null && cached?.lat !== undefined) {
      return { lat: cached.lat, lng: cached.lng! };
    }

    await new Promise((resolve) => setTimeout(resolve, NOMINATIM_DELAY_MS));

    const coords = await fetchFromNominatim(
      `${municipalityName} ${departmentName} Colombia`,
    );

    if (!coords) {
      if (!cached) {
        await prisma.location.upsert({
          where:  { codeLocation },
          update: {},
          create: { codeLocation, name: municipalityName, codeDepartment: departmentName },
        });
      }
      return null;
    }

    await prisma.location.upsert({
      where:  { codeLocation },
      update: { lat: coords.lat, lng: coords.lng },
      create: {
        codeLocation,
        name:           municipalityName,
        codeDepartment: departmentName,
        lat:            coords.lat,
        lng:            coords.lng,
      },
    });

    return coords;
  },
};
