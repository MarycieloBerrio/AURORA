"use client";

import { useState } from "react";
import { Card } from "@/components/atoms/card";
import type { CareerWithAffinity } from "@/constants/careers";
import { AptitudePanel } from "@/features/results/components/aptitude-panel";
import { CareersPanel } from "@/features/results/components/careers-panel";
import { HexacoPanel } from "@/features/results/components/hexaco-panel";
import { RiasecPanel } from "@/features/results/components/riasec-panel";
import {
  CAREER_AFFINITY_DISPLAY_MODES,
  type CareerAffinityDisplayMode,
} from "@/features/results/constants/affinity-categories";
import {
  CAREER_COLORS,
  MAX_SELECTED_CAREERS,
  type CareerOverlay,
} from "@/features/results/lib/career-colors";
import type { InterestsList, PersonalityList, SkillsDict } from "@/types/test-results";

interface ResultsDashboardProps {
  careers: CareerWithAffinity[];
  interests: InterestsList;
  personality: PersonalityList;
  skills: SkillsDict;
  affinityDisplayMode?: CareerAffinityDisplayMode;
}

export function ResultsDashboard({
  careers,
  interests,
  personality,
  skills,
  affinityDisplayMode = CAREER_AFFINITY_DISPLAY_MODES.category,
}: ResultsDashboardProps) {
  const [selectedCareers, setSelectedCareers] = useState<CareerWithAffinity[]>([]);

  function handleSelect(career: CareerWithAffinity) {
    setSelectedCareers((currentCareers) => {
      const selectedCareerIndex = currentCareers.findIndex(
        (selectedCareer) => selectedCareer.onetsoc_code === career.onetsoc_code,
      );

      if (selectedCareerIndex !== -1) {
        return currentCareers.filter((_, index) => index !== selectedCareerIndex);
      }

      if (currentCareers.length >= MAX_SELECTED_CAREERS) {
        return currentCareers;
      }

      return [...currentCareers, career];
    });
  }

  const overlays: CareerOverlay[] = selectedCareers.map((career, index) => ({
    career,
    color: CAREER_COLORS[index],
  }));

  return (
    <div className="flex min-w-0 flex-col gap-5 lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <Card data-tour="riasec" className="p-5">
          <RiasecPanel interests={interests} overlays={overlays} />
        </Card>
        <Card data-tour="hexaco" className="p-5">
          <HexacoPanel personality={personality} overlays={overlays} />
        </Card>
        <Card data-tour="aptitude" className="p-5">
          <AptitudePanel skills={skills} overlays={overlays} />
        </Card>
      </div>

      <div className="min-w-0 flex-1">
        <Card data-tour="careers" className="sticky top-6 max-h-[calc(100vh-5rem)] overflow-y-auto p-5">
          <CareersPanel
            careers={careers}
            overlays={overlays}
            onSelect={handleSelect}
            onClearSelections={() => setSelectedCareers([])}
            affinityDisplayMode={affinityDisplayMode}
          />
        </Card>
      </div>
    </div>
  );
}
