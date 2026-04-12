"use client";

import { useState } from "react";
import { CareerCard } from "@/features/results/components/career-card";
import type { CareerWithAffinity } from "@/constants/careers";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

type SortBy  = "affinity" | "alpha";
type SortDir = "desc" | "asc";
type LevelFilter = "all" | "TG" | "UN";

const LEVEL_FILTERS: Array<{ key: LevelFilter; label: string }> = [
  { key: "all", label: "Todos" },
  { key: "UN",  label: "Profesional" },
  { key: "TG",  label: "Tecnología" },
];

const SORT_BY_OPTIONS: Array<{ key: SortBy; label: string }> = [
  { key: "affinity", label: "Afinidad" },
  { key: "alpha",    label: "Alfabético" },
];

const SORT_DIR_OPTIONS: Record<SortBy, Array<{ key: SortDir; label: string }>> = {
  affinity: [
    { key: "desc", label: "Mayor" },
    { key: "asc",  label: "Menor" },
  ],
  alpha: [
    { key: "asc",  label: "A → Z" },
    { key: "desc", label: "Z → A" },
  ],
};

function sortCareers(careers: CareerWithAffinity[], by: SortBy, dir: SortDir): CareerWithAffinity[] {
  return [...careers].sort((a, b) => {
    const cmp =
      by === "affinity"
        ? a.affinity - b.affinity
        : a.title.localeCompare(b.title, "es");
    return dir === "desc" ? -cmp : cmp;
  });
}

interface CareersPanelProps {
  careers: CareerWithAffinity[];
  overlays: CareerOverlay[];
  onSelect: (career: CareerWithAffinity) => void;
}

export function CareersPanel({ careers, overlays, onSelect }: CareersPanelProps) {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [sortBy,  setSortBy]  = useState<SortBy>("affinity");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = careers.filter((c) => levelFilter === "all" || c.academic_level === levelFilter);
  const sorted   = sortCareers(filtered, sortBy, sortDir);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Carreras recomendadas
        </h2>
        <p className="mt-0.5 text-[11px] text-slate-400">
          Selecciona hasta 3 para comparar — Solo carreras STEM
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Level filter */}
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          {LEVEL_FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setLevelFilter(key)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                levelFilter === key
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort criterion */}
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          {SORT_BY_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setSortBy(key); setSortDir("desc"); }}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                sortBy === key
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort direction — options change based on criterion */}
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          {SORT_DIR_OPTIONS[sortBy].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSortDir(key)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                sortDir === key
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Career list */}
      <div className="space-y-2">
        {sorted.length === 0 ? (
          <p className="rounded-lg bg-slate-50 px-3 py-4 text-center text-[11px] text-slate-400">
            No hay carreras para este nivel
          </p>
        ) : (
          sorted.map((career, i) => {
            const overlay = overlays.find((o) => o.career.onetsoc_code === career.onetsoc_code);
            return (
              <CareerCard
                key={career.onetsoc_code}
                career={career}
                rank={i + 1}
                overlay={overlay}
                onClick={() => onSelect(career)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
