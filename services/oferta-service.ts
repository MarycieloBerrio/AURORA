import { prisma } from "@/lib/prisma";
import { fetchProgramOfferings, normalizeProgram } from "@/lib/socrata-client";
import { geocodingService } from "@/services/geocoding-service";
import { OFFERING_CACHE_TTL_DAYS } from "@/constants/socrata";
import type { ProgramOffering } from "@prisma/client";

function cacheCutoffDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() - OFFERING_CACHE_TTL_DAYS);
  return date;
}

export const ofertaService = {
  async getOfferingsForProgram(programTitle: string): Promise<ProgramOffering[]> {
    const programKey = normalizeProgram(programTitle);
    const cutoff     = cacheCutoffDate();

    const freshRow = await prisma.programOffering.findFirst({
      where: { programKey, fetchedAt: { gte: cutoff } },
    });

    if (!freshRow) {
      await prisma.programOffering.deleteMany({ where: { programKey } });

      const offerings = await fetchProgramOfferings(programTitle);

      const seen = new Set<string>();
      const deduped = offerings.filter((o) => {
        const key = `${o.institutionName}||${o.municipality}||${o.methodology}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (deduped.length > 0) {
        await prisma.programOffering.createMany({
          data: deduped.map((o) => ({
            programKey:      o.programKey,
            institutionName: o.institutionName,
            municipality:    o.municipality,
            department:      o.department,
            character:       o.character,
            methodology:     o.methodology,
            academicLevel:   o.academicLevel,
          })),
          skipDuplicates: true,
        });
      }
    }

    return prisma.programOffering.findMany({
      where:   { programKey },
      orderBy: [{ department: "asc" }, { institutionName: "asc" }],
    });
  },

  async geocodePendingOfferings(programKey: string): Promise<void> {
    const pending = await prisma.programOffering.findMany({
      where: { programKey, lat: null },
    });

    const seen = new Set<string>();

    for (const offering of pending) {
      const pairKey = `${offering.institutionName}||${offering.municipality}`;
      if (seen.has(pairKey)) continue;
      seen.add(pairKey);

      const coords = await geocodingService.geocodeInstitution(
        offering.institutionName,
        offering.municipality,
      );

      if (coords) {
        await prisma.programOffering.updateMany({
          where: {
            programKey,
            institutionName: offering.institutionName,
            municipality:    offering.municipality,
            lat:             null,
          },
          data: {
            lat:        coords.lat,
            lng:        coords.lng,
            geocodedAt: new Date(),
          },
        });
      }
    }
  },
};
