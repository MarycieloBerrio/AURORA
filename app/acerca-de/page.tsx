import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de Aurora — Guía Vocacional",
  description:
    "Aurora es un proyecto de investigación de la Universidad Nacional de Colombia para orientación vocacional gamificada.",
};

const STACK: { name: string; description: string; license: string; url: string }[] = [
  { name: "Next.js 15",          description: "Framework de React para aplicaciones web",            license: "MIT",        url: "https://nextjs.org" },
  { name: "React 19",            description: "Biblioteca de interfaces de usuario",                  license: "MIT",        url: "https://react.dev" },
  { name: "TypeScript 5",        description: "Superset tipado de JavaScript",                        license: "Apache 2.0", url: "https://typescriptlang.org" },
  { name: "Tailwind CSS 4",      description: "Framework de estilos utilitarios",                     license: "MIT",        url: "https://tailwindcss.com" },
  { name: "Prisma 6",            description: "ORM para PostgreSQL",                                  license: "Apache 2.0", url: "https://prisma.io" },
  { name: "Supabase",            description: "Base de datos PostgreSQL y almacenamiento en la nube", license: "Apache 2.0", url: "https://supabase.com" },
  { name: "NextAuth.js 4",       description: "Autenticación con Google OAuth y JWT",                 license: "ISC",        url: "https://next-auth.js.org" },
  { name: "Leaflet / React-Leaflet", description: "Mapas interactivos con MarkerCluster",            license: "BSD 2-Clause", url: "https://leafletjs.com" },
  { name: "React Hook Form",     description: "Gestión de formularios",                               license: "MIT",        url: "https://react-hook-form.com" },
  { name: "Zod 4",               description: "Validación de esquemas en TypeScript",                 license: "MIT",        url: "https://zod.dev" },
  { name: "SheetJS (xlsx)",      description: "Generación de archivos Excel",                         license: "Apache 2.0", url: "https://sheetjs.com" },
  { name: "Vercel",              description: "Plataforma de despliegue y hosting",                   license: "—",          url: "https://vercel.com" },
];

const DATA_SOURCES: { name: string; description: string; license: string; url: string }[] = [
  { name: "O*NET Interest Profiler",        description: "Base del instrumento RIASEC y catálogo de ocupaciones", license: "CC BY 4.0 / Dominio público", url: "https://www.onetcenter.org/IP.html" },
  { name: "HEXACO Personality Inventory-R", description: "Modelo de personalidad de seis factores",               license: "Uso educativo / investigación", url: "https://hexaco.org" },
  { name: "SNIES — MEN Colombia",           description: "Programas de educación superior registrados en Colombia", license: "Datos Abiertos Colombia",      url: "https://snies.mineducacion.gov.co" },
  { name: "Nominatim / OpenStreetMap",      description: "Geocodificación de municipios colombianos",              license: "ODbL 1.0",                     url: "https://nominatim.openstreetmap.org" },
];

export default function AcercaDePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

        {/* Back */}
        <Link
          href="/app/floor"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          Volver al piso
        </Link>

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div className="shrink-0">
            <Image
              src="/assets/favicon.png"
              alt="Aurora"
              width={48}
              height={48}
              className="drop-shadow-sm"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Universidad Nacional de Colombia
            </p>
            <h1 className="text-2xl font-bold text-slate-900">Aurora</h1>
            <p className="mt-1 text-sm text-slate-500">
              Plataforma de orientación vocacional gamificada para estudiantes colombianos
            </p>
          </div>
        </div>

        <div className="space-y-6">

          {/* Proyecto */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-4 text-base font-bold text-slate-800">Proyecto de investigación</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Aurora es un <strong>proyecto de investigación universitario</strong> desarrollado en la{" "}
              <strong>Universidad Nacional de Colombia</strong>. Su objetivo es ofrecer una experiencia
              gamificada e interactiva para la orientación vocacional de estudiantes, integrando
              instrumentos psicométricos validados (RIASEC y HEXACO) con pruebas de aptitudes cognitivas
              y datos reales de programas de educación superior en Colombia.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Los resultados se calculan mediante un algoritmo de afinidad multidimensional que compara
              el perfil del estudiante con un catálogo de carreras universitarias, permitiendo identificar
              las opciones con mayor compatibilidad según intereses, personalidad y aptitudes.
            </p>
          </div>

          {/* Equipo */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-4 text-base font-bold text-slate-800">Equipo</h2>
            <div className="space-y-4">
              {[
                {
                  name:  "Marycielo Berrio",
                  role:  "Desarrollo y diseño",
                  email: "mberrioz@unal.edu.co",
                },
                {
                  name:  "Julian Moreno",
                  role:  "Investigación y dirección",
                  email: "jmoreno1@unal.edu.co",
                },
              ].map((person) => (
                <div key={person.email} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{person.name}</p>
                    <p className="text-xs text-slate-500">{person.role} · Universidad Nacional de Colombia</p>
                  </div>
                  <a
                    href={`mailto:${person.email}`}
                    className="shrink-0 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100"
                  >
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Instrumentos */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-1 text-base font-bold text-slate-800">Instrumentos psicométricos y datos</h2>
            <p className="mb-4 text-xs text-slate-400">
              Aurora utiliza instrumentos de dominio público y fuentes de datos abiertas.
            </p>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Fuente</th>
                    <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:table-cell">Uso</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Licencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DATA_SOURCES.map((s) => (
                    <tr key={s.name} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3">
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-amber-700 hover:underline"
                        >
                          {s.name}
                        </a>
                      </td>
                      <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">{s.description}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">{s.license}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stack */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-1 text-base font-bold text-slate-800">Tecnologías utilizadas</h2>
            <p className="mb-4 text-xs text-slate-400">
              Todo el código fuente es original salvo las dependencias listadas a continuación.
            </p>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Librería</th>
                    <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:table-cell">Propósito</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Licencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STACK.map((s) => (
                    <tr key={s.name} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3">
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-slate-700 hover:text-amber-700 hover:underline"
                        >
                          {s.name}
                        </a>
                      </td>
                      <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">{s.description}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                          {s.license}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nota */}
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
            <p className="text-[11px] leading-relaxed text-amber-700">
              Aurora es un proyecto sin fines de lucro. Los datos de los usuarios se utilizan
              exclusivamente con fines de investigación académica, siguiendo los principios de la{" "}
              <strong>Ley 1581 de 2012</strong> de protección de datos personales de Colombia.{" "}
              <Link href="/politica-de-tratamiento-de-datos" className="font-semibold underline">
                Ver política de datos completa →
              </Link>
            </p>
          </div>

        </div>

        <p className="mt-8 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} Aurora · Universidad Nacional de Colombia
        </p>
      </div>
    </div>
  );
}
