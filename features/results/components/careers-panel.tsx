"use client";

import { useState } from "react";
import { CareerCard } from "@/features/results/components/career-card";
import type { CareerWithAffinity } from "@/constants/careers";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

type SortKey = "affinity-desc" | "affinity-asc" | "alpha-asc" | "alpha-desc";
type LevelFilter = "all" | "TG" | "UN";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "affinity-desc", label: "Mayor afinidad" },
  { key: "affinity-asc",  label: "Menor afinidad" },
  { key: "alpha-asc",     label: "A → Z" },
  { key: "alpha-desc",    label: "Z → A" },
];

const LEVEL_FILTERS: Array<{ key: LevelFilter; label: string }> = [
  { key: "all", label: "Todos" },
  { key: "UN",  label: "Pregrado" },
  { key: "TG",  label: "Tecnología" },
];

function sortCareers(careers: CareerWithAffinity[], sort: SortKey): CareerWithAffinity[] {
  return [...careers].sort((a, b) => {
    if (sort === "affinity-desc") return b.affinity - a.affinity;
    if (sort === "affinity-asc")  return a.affinity - b.affinity;
    if (sort === "alpha-asc")     return a.title.localeCompare(b.title, "es");
    return b.title.localeCompare(a.title, "es");
  });
}

interface CareersPanelProps {
  careers: CareerWithAffinity[];
  overlays: CareerOverlay[];
  onSelect: (career: CareerWithAffinity) => void;
}

export function CareersPanel({ careers, overlays, onSelect }: CareersPanelProps) {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [sort, setSort]               = useState<SortKey>("affinity-desc");

  const filtered = careers.filter((c) => levelFilter === "all" || c.academic_level === levelFilter);
  const sorted   = sortCareers(filtered, sort);

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

      <div className="flex flex-wrap items-center gap-2">
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

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm focus:outline-none"
        >
          {SORT_OPTIONS.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

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
