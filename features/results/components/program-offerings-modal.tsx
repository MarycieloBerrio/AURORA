"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import type { EnrichedSniesProgram } from "@/services/snies-service";
import type { CareerWithAffinity } from "@/constants/careers";
import {
  OfferingFiltersPanel,
  type OfferingFilters,
} from "@/features/results/components/offering-filters";
import { UniversityList } from "@/features/results/components/university-list";

const UniversityMap = dynamic(
  () =>
    import("@/features/results/components/university-map").then((m) => m.UniversityMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 animate-pulse rounded-xl bg-slate-100" />
    ),
  },
);

interface ProgramOfferingsModalProps {
  career:  CareerWithAffinity;
  onClose: () => void;
}

const DEFAULT_FILTERS: OfferingFilters = { department: "", municipality: "", character: "" };

/** Clave normalizada: sin acentos, minúsculas, sin espacios extra. */
function toKey(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Deduplica un array de strings usando `toKey` para comparar.
 * Cuando hay variantes ("Atlántico" / "Atlantico") conserva la primera
 * aparición (que en datasets colombianos suele ser la acentuada).
 */
function uniqueNames(names: (string | null)[]): string[] {
  const seen = new Map<string, string>(); // key → display
  for (const name of names) {
    if (!name) continue;
    const k = toKey(name);
    if (!seen.has(k)) seen.set(k, name);
  }
  return [...seen.values()].sort((a, b) => toKey(a).localeCompare(toKey(b), "es"));
}

export function ProgramOfferingsModal({ career, onClose }: ProgramOfferingsModalProps) {
  const [offerings,       setOfferings]       = useState<EnrichedSniesProgram[]>([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState<string | null>(null);
  const [filters,         setFilters]         = useState<OfferingFilters>(DEFAULT_FILTERS);
  const [focusedOffering, setFocusedOffering] = useState<EnrichedSniesProgram | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setOfferings([]);
    setFilters(DEFAULT_FILTERS);

    fetch(`/api/programs/oferta?programa=${encodeURIComponent(career.title)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar la oferta");
        return r.json() as Promise<{ offerings: EnrichedSniesProgram[] }>;
      })
      .then((data) => setOfferings(data.offerings))
      .catch(() => setError("No se pudo cargar la oferta académica."))
      .finally(() => setLoading(false));
  }, [career.title]);

  const departments = useMemo(
    () => uniqueNames(offerings.map((o) => o.nombredepartprograma)),
    [offerings],
  );

  const municipalities = useMemo(() => {
    const base = filters.department
      ? offerings.filter((o) => toKey(o.nombredepartprograma ?? "") === toKey(filters.department))
      : offerings;
    return uniqueNames(base.map((o) => o.nombremunicipioprograma));
  }, [offerings, filters.department]);

  const filtered = useMemo(
    () =>
      offerings.filter((o) => {
        if (filters.department   && toKey(o.nombredepartprograma    ?? "") !== toKey(filters.department))   return false;
        if (filters.municipality && toKey(o.nombremunicipioprograma ?? "") !== toKey(filters.municipality)) return false;
        if (filters.character    && o.nombrecaracteracademico !== filters.character)    return false;
        return true;
      }),
    [offerings, filters],
  );

  const handleFilterChange = (next: OfferingFilters) => {
    setFilters(next);
    setFocusedOffering(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Oferta académica en Colombia
            </p>
            <h2 className="text-lg font-bold text-slate-900">{career.title}</h2>
            {!loading && (
              <p className="text-[11px] text-slate-400">
                {offerings.length}{" "}
                {offerings.length === 1 ? "programa registrado" : "programas registrados"}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="ml-4 shrink-0 rounded-xl border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex flex-1 items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          </div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center p-12">
            <p className="text-sm text-rose-500">{error}</p>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            {/* Left panel: filters + list */}
            <div className="flex flex-col gap-3 overflow-y-auto border-b border-slate-100 p-4 md:w-2/5 md:border-b-0 md:border-r">
              <OfferingFiltersPanel
                filters={filters}
                departments={departments}
                municipalities={municipalities}
                onChange={handleFilterChange}
              />
              <UniversityList
                offerings={filtered}
                onFocusOffering={(o) => setFocusedOffering(o)}
              />
            </div>

            {/* Right panel: map */}
            <div className="flex min-h-[300px] flex-1 p-3">
              <UniversityMap offerings={filtered} focusedOffering={focusedOffering} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
