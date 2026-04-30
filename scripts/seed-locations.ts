/**
 * scripts/seed-locations.ts
 *
 * Geocodifica todos los municipios únicos que aparecen en snies_programs
 * y los guarda en la tabla locations.
 *
 * Uso:
 *   npx tsx scripts/seed-locations.ts
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config(); // fallback a .env si .env.local no existe

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const NOMINATIM_URL  = "https://nominatim.openstreetmap.org/search";
const DELAY_MS       = 300; // Nominatim rate-limit: ≤ 1 req/s
const BATCH_LOG_SIZE = 10;  // log progress every N municipalities

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(
  municipio: string,
  departamento: string,
): Promise<{ lat: number; lng: number } | null> {
  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("q", `${municipio} ${departamento} Colombia`);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  try {
    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "AuroraVocationalApp/1.0 (academic)" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (!data.length) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

async function main() {
  console.log("🗺  Iniciando geocodificación de municipios SNIES…\n");

  // 1. All unique municipality codes present in snies_programs
  const rows = await prisma.sniesProgram.findMany({
    select: {
      codigomunicipioprograma:  true,
      nombremunicipioprograma:  true,
      nombredepartprograma:     true,
    },
    where: {
      codigomunicipioprograma:  { not: null },
      nombremunicipioprograma:  { not: null },
      nombredepartprograma:     { not: null },
    },
    distinct: ["codigomunicipioprograma"],
  });

  console.log(`   ${rows.length} municipios únicos encontrados en SNIES\n`);

  // 2. Which codes are already geocoded?
  const alreadyIn = await prisma.location.findMany({
    select: { codeLocation: true, lat: true },
  });
  const done    = new Set(alreadyIn.filter((l) => l.lat !== null).map((l) => l.codeLocation));
  const pending = rows.filter((r) => !done.has(r.codigomunicipioprograma!));

  console.log(`   ${done.size} ya geocodificados, ${pending.length} pendientes\n`);

  if (pending.length === 0) {
    console.log("✅ Tabla locations ya está completa.");
    return;
  }

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < pending.length; i++) {
    const row     = pending[i];
    const code    = row.codigomunicipioprograma!;
    const name    = row.nombremunicipioprograma!;
    const depto   = row.nombredepartprograma!;

    await sleep(DELAY_MS);
    const coords = await geocode(name, depto);

    if (coords) {
      await prisma.location.upsert({
        where:  { codeLocation: code },
        update: { lat: coords.lat, lng: coords.lng },
        create: {
          codeLocation:   code,
          name:           name,
          codeDepartment: depto,
          lat:            coords.lat,
          lng:            coords.lng,
        },
      });
      ok++;
    } else {
      // Insert without coords so we don't retry on future requests
      await prisma.location.upsert({
        where:  { codeLocation: code },
        update: {},
        create: { codeLocation: code, name, codeDepartment: depto },
      });
      fail++;
    }

    if ((i + 1) % BATCH_LOG_SIZE === 0 || i === pending.length - 1) {
      const pct = (((i + 1) / pending.length) * 100).toFixed(1);
      process.stdout.write(
        `\r   [${pct}%] ${i + 1}/${pending.length}  ✓ ${ok}  ✗ ${fail}   `,
      );
    }
  }

  console.log(`\n\n✅ Geocodificación completada: ${ok} con coordenadas, ${fail} sin resultado.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
