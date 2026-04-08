"use client";

import { useState } from "react";
import { CareerCard } from "@/features/results/components/career-card";
import { MOCK_STEM_CAREERS, type CareerLevel } from "@/constants/mock-careers";
import type { ResultTier } from "@/features/results/lib/result-tier";

const TIER_CAREER_COUNT: Record<ResultTier, number> = {
  minimum: 5,
  intermediate: 10,
  complete: MOCK_STEM_CAREERS.length,
};

type SortKey = "affinity-desc" | "affinity-asc" | "alpha-asc" | "alpha-desc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "affinity-desc", label: "Mayor afinidad" },
  { key: "affinity-asc",  label: "Menor afinidad" },
  { key: "alpha-asc",     label: "A → Z" },
  { key: "alpha-desc",    label: "Z → A" },
];

const LEVEL_FILTERS: Array<{ key: CareerLevel | "all"; label: string }> = [
  { key: "all",        label: "Todos" },
  { key: "Pregrado",   label: "Pregrado" },
  { key: "Tecnología", label: "Tecnología" },
];

function sortCareers(
  careers: typeof MOCK_STEM_CAREERS,
  sort: SortKey,
) {
  return [...careers].sort((a, b) => {
    if (sort === "affinity-desc") return b.affinity - a.affinity;
    if (sort === "affinity-asc")  return a.affinity - b.affinity;
    if (sort === "alpha-asc")     return a.title.localeCompare(b.title, "es");
    return b.title.localeCompare(a.title, "es");
  });
}

interface CareersPanelProps {
  tier: ResultTier;
}

export function CareersPanel({ tier }: CareersPanelProps) {
  const [levelFilter, setLevelFilter] = useState<CareerLevel | "all">("all");
  const [sort, setSort]               = useState<SortKey>("affinity-desc");

  const count   = TIER_CAREER_COUNT[tier];
  const pool    = MOCK_STEM_CAREERS.slice(0, count);
  const filtered = pool.filter((c) => levelFilter === "all" || c.level === levelFilter);
  const careers  = sortCareers(filtered, sort);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Carreras recomendadas
        </h2>
        <p className="mt-0.5 text-[11px] text-slate-400">Solo carreras STEM</p>
      </div>

      {/* Filters + sort */}
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

        {/* Sort */}
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

      {/* Career list */}
      <div className="space-y-2">
        {careers.length === 0 ? (
          <p className="rounded-lg bg-slate-50 px-3 py-4 text-center text-[11px] text-slate-400">
            No hay carreras para este nivel
          </p>
        ) : (
          careers.map((career, i) => (
            <CareerCard key={career.id} career={career} rank={i + 1} />
          ))
        )}
      </div>

      {tier !== "complete" && (
        <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-center text-[11px] text-slate-400">
          Completa mas pruebas para desbloquear todas las carreras
        </p>
      )}
    </div>
  );
}
