"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { UI_ICON_NAMES, UiIcon } from "@/components/atoms/ui-icon";
import type { CareerWithAffinity } from "@/constants/careers";
import { CareerCard } from "@/features/results/components/career-card";
import {
  AFFINITY_UI_CONFIG,
  CAREER_AFFINITY_DISPLAY_MODES,
  type CareerAffinityDisplayMode,
} from "@/features/results/constants/affinity-categories";
import type { CareerOverlay } from "@/features/results/lib/career-colors";
import type { CareerAffinityGroup } from "@/features/results/lib/career-groups";

interface CareerGroupProps {
  group: CareerAffinityGroup;
  overlays: CareerOverlay[];
  onSelect: (career: CareerWithAffinity) => void;
  onViewOfferings: (career: CareerWithAffinity) => void;
  affinityDisplayMode?: CareerAffinityDisplayMode;
}

export function CareerGroup({
  group,
  overlays,
  onSelect,
  onViewOfferings,
  affinityDisplayMode = CAREER_AFFINITY_DISPLAY_MODES.category,
}: CareerGroupProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(AFFINITY_UI_CONFIG.groupsInitiallyExpanded);
  const contentId = `${AFFINITY_UI_CONFIG.groupContentIdPrefix}-${group.id}`;

  return (
    <section className="space-y-2">
      <h3>
        <Button
          type="button"
          variant="ghost"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
          className="w-full justify-between px-2 py-2 text-[11px] uppercase tracking-widest text-slate-500"
        >
          <span>{group.label}</span>
          <UiIcon
            name={UI_ICON_NAMES.chevronDown}
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </Button>
      </h3>

      <div id={contentId} hidden={!isExpanded} className="space-y-2">
        {group.careers.map((career) => {
          const overlay = overlays.find(
            (item) => item.career.onetsoc_code === career.onetsoc_code,
          );

          return (
            <CareerCard
              key={career.onetsoc_code}
              career={career}
              overlay={overlay}
              onClick={() => onSelect(career)}
              onViewOfferings={() => onViewOfferings(career)}
              affinityDisplayMode={affinityDisplayMode}
            />
          );
        })}
      </div>
    </section>
  );
}
