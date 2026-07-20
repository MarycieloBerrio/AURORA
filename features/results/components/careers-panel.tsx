"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { UI_ICON_NAMES, UiIcon } from "@/components/atoms/ui-icon";
import { SegmentedControl } from "@/components/molecules/segmented-control";
import type { CareerWithAffinity } from "@/constants/careers";
import { CareerCard } from "@/features/results/components/career-card";
import { ProgramOfferingsModal } from "@/features/results/components/program-offerings-modal";
import {
  CAREER_FILTER_DEFAULTS,
  CAREER_LEVEL_FILTER_OPTIONS,
  CAREER_SEARCH_CONFIG,
  CAREER_SORT_BY,
  CAREER_SORT_DEFAULT_DIRECTION,
  CAREER_SORT_DIRECTION,
  CAREER_SORT_DIRECTION_OPTIONS,
  CAREER_SORT_OPTIONS,
  CAREERS_PANEL_COPY,
  type CareerLevelFilter,
  type CareerSortBy,
  type CareerSortDirection,
} from "@/features/results/constants/careers-panel";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

function sortCareers(
  careers: CareerWithAffinity[],
  sortBy: CareerSortBy,
  sortDirection: CareerSortDirection,
): CareerWithAffinity[] {
  return [...careers].sort((firstCareer, secondCareer) => {
    const comparison =
      sortBy === CAREER_SORT_BY.affinity
        ? firstCareer.affinity - secondCareer.affinity
        : firstCareer.title.localeCompare(secondCareer.title, CAREER_SEARCH_CONFIG.locale);

    return sortDirection === CAREER_SORT_DIRECTION.descending ? -comparison : comparison;
  });
}

function normalizeSearchValue(value: string): string {
  return value
    .normalize(CAREER_SEARCH_CONFIG.normalizationForm)
    .replace(CAREER_SEARCH_CONFIG.diacriticsPattern, CAREER_FILTER_DEFAULTS.searchQuery)
    .toLocaleLowerCase(CAREER_SEARCH_CONFIG.locale);
}

interface CareersPanelProps {
  careers: CareerWithAffinity[];
  overlays: CareerOverlay[];
  onSelect: (career: CareerWithAffinity) => void;
  onClearSelections: () => void;
}

export function CareersPanel({ careers, overlays, onSelect, onClearSelections }: CareersPanelProps) {
  const [levelFilter, setLevelFilter] = useState<CareerLevelFilter>(CAREER_FILTER_DEFAULTS.level);
  const [sortBy, setSortBy] = useState<CareerSortBy>(CAREER_FILTER_DEFAULTS.sortBy);
  const [sortDirection, setSortDirection] = useState<CareerSortDirection>(
    CAREER_FILTER_DEFAULTS.sortDirection,
  );
  const [searchQuery, setSearchQuery] = useState<string>(CAREER_FILTER_DEFAULTS.searchQuery);
  const [offeringsCareer, setOfferingsCareer] = useState<CareerWithAffinity | null>(null);

  const normalizedSearchQuery = normalizeSearchValue(searchQuery.trim());
  const filteredCareers = careers.filter(
    (career) =>
      (levelFilter === CAREER_FILTER_DEFAULTS.level || career.academic_level === levelFilter) &&
      normalizeSearchValue(career.title).includes(normalizedSearchQuery),
  );
  const sortedCareers = sortCareers(filteredCareers, sortBy, sortDirection);
  const hasFiltersOrSelections =
    levelFilter !== CAREER_FILTER_DEFAULTS.level ||
    searchQuery !== CAREER_FILTER_DEFAULTS.searchQuery ||
    sortBy !== CAREER_FILTER_DEFAULTS.sortBy ||
    sortDirection !== CAREER_FILTER_DEFAULTS.sortDirection ||
    overlays.length > 0;

  function handleSortByChange(value: CareerSortBy) {
    setSortBy(value);
    setSortDirection(CAREER_SORT_DEFAULT_DIRECTION[value]);
  }

  function handleClearFiltersAndSelections() {
    setLevelFilter(CAREER_FILTER_DEFAULTS.level);
    setSortBy(CAREER_FILTER_DEFAULTS.sortBy);
    setSortDirection(CAREER_FILTER_DEFAULTS.sortDirection);
    setSearchQuery(CAREER_FILTER_DEFAULTS.searchQuery);
    onClearSelections();
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 rounded-lg bg-indigo-50 p-1.5 text-indigo-500">
            <UiIcon name={UI_ICON_NAMES.sparkles} className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {CAREERS_PANEL_COPY.title}
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-400">{CAREERS_PANEL_COPY.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <UiIcon
              name={UI_ICON_NAMES.search}
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={CAREERS_PANEL_COPY.searchPlaceholder}
              aria-label={CAREERS_PANEL_COPY.searchPlaceholder}
              className="py-2 pl-9 text-xs"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClearFiltersAndSelections}
            disabled={!hasFiltersOrSelections}
            className="shrink-0 gap-1.5 px-3 py-2 text-xs disabled:text-slate-300"
          >
            <UiIcon name={UI_ICON_NAMES.clear} className="h-3.5 w-3.5" />
            {CAREERS_PANEL_COPY.clearFilters}
          </Button>
        </div>

        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <div className="flex min-w-max items-center gap-2">
            <SegmentedControl
              ariaLabel={CAREERS_PANEL_COPY.levelFilterLabel}
              icon={UI_ICON_NAMES.graduationCap}
              options={CAREER_LEVEL_FILTER_OPTIONS}
              value={levelFilter}
              onChange={setLevelFilter}
            />
            <SegmentedControl
              ariaLabel={CAREERS_PANEL_COPY.sortByLabel}
              icon={UI_ICON_NAMES.sort}
              options={CAREER_SORT_OPTIONS}
              value={sortBy}
              onChange={handleSortByChange}
            />
            <SegmentedControl
              ariaLabel={CAREERS_PANEL_COPY.sortDirectionLabel}
              icon={UI_ICON_NAMES.arrowUpDown}
              options={CAREER_SORT_DIRECTION_OPTIONS[sortBy]}
              value={sortDirection}
              onChange={setSortDirection}
            />
          </div>
        </div>

        <div className="space-y-2">
          {sortedCareers.length === 0 ? (
            <div className="flex flex-col items-center rounded-xl bg-slate-50 px-3 py-5 text-center text-slate-400">
              <UiIcon name={UI_ICON_NAMES.emptySearch} className="mb-1.5 h-5 w-5" />
              <p className="text-[11px]">{CAREERS_PANEL_COPY.emptyState}</p>
            </div>
          ) : (
            sortedCareers.map((career) => {
              const overlay = overlays.find(
                (item) => item.career.onetsoc_code === career.onetsoc_code,
              );

              return (
                <CareerCard
                  key={career.onetsoc_code}
                  career={career}
                  overlay={overlay}
                  onClick={() => onSelect(career)}
                  onViewOfferings={() => setOfferingsCareer(career)}
                />
              );
            })
          )}
        </div>
      </div>

      {offeringsCareer && (
        <ProgramOfferingsModal
          career={offeringsCareer}
          onClose={() => setOfferingsCareer(null)}
        />
      )}
    </>
  );
}
