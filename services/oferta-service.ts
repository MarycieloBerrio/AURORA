import { sniesService, type EnrichedSniesProgram } from "@/services/snies-service";
import { geocodingService } from "@/services/geocoding-service";

export const ofertaService = {
  async getOfferingsForProgram(
    programName: string,
  ): Promise<EnrichedSniesProgram[]> {
    return sniesService.searchByName(programName);
  },

  async geocodePendingMunicipalities(
    programs: EnrichedSniesProgram[],
  ): Promise<void> {
    const pending = programs.filter(
      (p) => p.lat === null && p.codigomunicipioprograma,
    );

    const seen = new Set<string>();

    for (const p of pending) {
      const code = p.codigomunicipioprograma!;
      if (seen.has(code)) continue;
      seen.add(code);

      await geocodingService.geocodeLocation(
        code,
        p.nombremunicipioprograma ?? "",
        p.nombredepartprograma ?? "",
      );
    }
  },
};
