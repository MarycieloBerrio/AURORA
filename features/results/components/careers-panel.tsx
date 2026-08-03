"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { UI_ICON_NAMES, UiIcon } from "@/components/atoms/ui-icon";
import { SegmentedControl } from "@/components/molecules/segmented-control";
import type { CareerWithAffinity } from "@/constants/careers";
import { AffinityLegend } from "@/features/results/components/affinity-legend";
import { CareerGroup } from "@/features/results/components/career-group";
import { ProgramOfferingsModal } from "@/features/results/components/program-offerings-modal";
import {
  CAREER_AFFINITY_DISPLAY_MODES,
  type CareerAffinityDisplayMode,
} from "@/features/results/constants/affinity-categories";
import {
  CAREER_FILTER_DEFAULTS,
  CAREER_LEVEL_FILTER_OPTIONS,
  CAREER_SEARCH_CONFIG,
  CAREERS_PANEL_COPY,
  type CareerLevelFilter,
} from "@/features/results/constants/careers-panel";
import type { CareerOverlay } from "@/features/results/lib/career-colors";
import { groupCareersByAffinityCategory } from "@/features/results/lib/career-groups";

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
  affinityDisplayMode?: CareerAffinityDisplayMode;
}

export function CareersPanel({
  careers,
  overlays,
  onSelect,
  onClearSelections,
  affinityDisplayMode = CAREER_AFFINITY_DISPLAY_MODES.category,
}: CareersPanelProps) {
  const [levelFilter, setLevelFilter] = useState<CareerLevelFilter>(CAREER_FILTER_DEFAULTS.level);
  const [searchQuery, setSearchQuery] = useState<string>(CAREER_FILTER_DEFAULTS.searchQuery);
  const [offeringsCareer, setOfferingsCareer] = useState<CareerWithAffinity | null>(null);

  const normalizedSearchQuery = normalizeSearchValue(searchQuery.trim());
  const visibleCareerGroups = groupCareersByAffinityCategory(careers)
    .map((group) => ({
      ...group,
      careers: group.careers.filter(
        (career) =>
          (levelFilter === CAREER_FILTER_DEFAULTS.level ||
            career.academic_level === levelFilter) &&
          normalizeSearchValue(career.title).includes(normalizedSearchQuery),
      ),
    }))
    .filter((group) => group.careers.length > 0);
  const hasFiltersOrSelections =
    levelFilter !== CAREER_FILTER_DEFAULTS.level ||
    searchQuery !== CAREER_FILTER_DEFAULTS.searchQuery ||
    overlays.length > 0;
  const displaysCategoryIndicators =
    affinityDisplayMode === CAREER_AFFINITY_DISPLAY_MODES.category;

  function handleClearFiltersAndSelections() {
    setLevelFilter(CAREER_FILTER_DEFAULTS.level);
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

        {displaysCategoryIndicators ? <AffinityLegend /> : null}

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
          </div>
        </div>

        <div className="space-y-5">
          {visibleCareerGroups.length === 0 ? (
            <div className="flex flex-col items-center rounded-xl bg-slate-50 px-3 py-5 text-center text-slate-400">
              <UiIcon name={UI_ICON_NAMES.emptySearch} className="mb-1.5 h-5 w-5" />
              <p className="text-[11px]">{CAREERS_PANEL_COPY.emptyState}</p>
            </div>
          ) : (
            visibleCareerGroups.map((group) => (
              <CareerGroup
                key={group.id}
                group={group}
                overlays={overlays}
                onSelect={onSelect}
                onViewOfferings={setOfferingsCareer}
                affinityDisplayMode={affinityDisplayMode}
              />
            ))
          )}
        </div>
      </div>

      {offeringsCareer ? (
        <ProgramOfferingsModal
          career={offeringsCareer}
          onClose={() => setOfferingsCareer(null)}
        />
      ) : null}
    </>
  );
}
