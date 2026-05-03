"use client";

import { useState } from "react";
import type { InterestsList, PersonalityList, SkillsDict } from "@/types/test-results";
import type { CareerWithAffinity } from "@/constants/careers";
import { CAREER_COLORS, MAX_SELECTED_CAREERS, type CareerOverlay } from "@/features/results/lib/career-colors";
import { RiasecPanel } from "@/features/results/components/riasec-panel";
import { HexacoPanel } from "@/features/results/components/hexaco-panel";
import { AptitudePanel } from "@/features/results/components/aptitude-panel";
import { CareersPanel } from "@/features/results/components/careers-panel";
import { Card } from "@/components/atoms/card";

interface ResultsDashboardProps {
  careers: CareerWithAffinity[];
  interests: InterestsList;
  personality: PersonalityList;
  skills: SkillsDict;
}

export function ResultsDashboard({ careers, interests, personality, skills }: ResultsDashboardProps) {
  const [selectedCareers, setSelectedCareers] = useState<CareerWithAffinity[]>([]);

  function handleSelect(career: CareerWithAffinity) {
    setSelectedCareers((prev) => {
      const idx = prev.findIndex((c) => c.onetsoc_code === career.onetsoc_code);
      if (idx !== -1) return prev.filter((_, i) => i !== idx);
      if (prev.length >= MAX_SELECTED_CAREERS) return prev;
      return [...prev, career];
    });
  }

  const overlays: CareerOverlay[] = selectedCareers.map((career, i) => ({
    career,
    color: CAREER_COLORS[i],
  }));

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="flex flex-col gap-5 lg:w-1/2">
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

      <div className="lg:w-1/2">
        <Card data-tour="careers" className="sticky top-6 max-h-[calc(100vh-5rem)] overflow-y-auto p-5">
          <CareersPanel careers={careers} overlays={overlays} onSelect={handleSelect} />
        </Card>
      </div>
    </div>
  );
}
