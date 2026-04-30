import { sniesService, type EnrichedSniesProgram } from "@/services/snies-service";
import { geocodingService } from "@/services/geocoding-service";

/** How many unique municipalities to geocode synchronously per request. */
const SYNC_GEOCODE_LIMIT = 15;

export const ofertaService = {
  async getOfferingsForProgram(
    programName: string,
  ): Promise<EnrichedSniesProgram[]> {
    return sniesService.searchByName(programName);
  },

  /**
   * Geocode municipalities that still have null coordinates.
   * Pass `limit` to cap synchronous work (remaining are left for a background call).
   * Returns the number of unique codes actually geocoded.
   */
  async geocodePendingMunicipalities(
    programs: EnrichedSniesProgram[],
    limit = Infinity,
  ): Promise<number> {
    const pending = programs.filter(
      (p) => p.lat === null && p.codigomunicipioprograma,
    );

    const seen = new Set<string>();
    let count = 0;

    for (const p of pending) {
      if (count >= limit) break;

      const code = p.codigomunicipioprograma!;
      if (seen.has(code)) continue;
      seen.add(code);
      count++;

      await geocodingService.geocodeLocation(
        code,
        p.nombremunicipioprograma ?? "",
        p.nombredepartprograma ?? "",
      );
    }

    return count;
  },
};

export { SYNC_GEOCODE_LIMIT };
