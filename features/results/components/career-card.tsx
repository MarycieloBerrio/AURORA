"use client";

import { useState, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/atoms/badge";
import {
  CAREER_ACADEMIC_LEVEL_LABELS,
  type CareerAcademicLevel,
  type CareerWithAffinity,
} from "@/constants/careers";
import { AffinityIndicator } from "@/features/results/components/affinity-indicator";
import {
  AFFINITY_COPY,
  AFFINITY_UI_CONFIG,
  CAREER_AFFINITY_DISPLAY_MODES,
  CAREER_AFFINITY_FORMAT_CONFIG,
  type CareerAffinityDisplayMode,
} from "@/features/results/constants/affinity-categories";
import { CAREERS_PANEL_COPY } from "@/features/results/constants/careers-panel";
import type { CareerOverlay } from "@/features/results/lib/career-colors";

const LEVEL_STYLES: Record<CareerAcademicLevel, string> = {
  TC: "bg-emerald-50 text-emerald-600 border-emerald-200",
  TG: "bg-sky-50 text-sky-600 border-sky-200",
  UN: "bg-violet-50 text-violet-600 border-violet-200",
};

const CAREER_AFFINITY_FORMATTER = new Intl.NumberFormat(
  CAREER_AFFINITY_FORMAT_CONFIG.locale,
  CAREER_AFFINITY_FORMAT_CONFIG.options,
);

interface CareerCardProps {
  career:           CareerWithAffinity;
  overlay?:         CareerOverlay;
  onClick?:         () => void;
  onViewOfferings?: () => void;
  affinityDisplayMode?: CareerAffinityDisplayMode;
}

export function CareerCard({
  career,
  overlay,
  onClick,
  onViewOfferings,
  affinityDisplayMode = CAREER_AFFINITY_DISPLAY_MODES.category,
}: CareerCardProps) {
  const isSelected    = !!overlay;
  const levelLabel    = CAREER_ACADEMIC_LEVEL_LABELS[career.academic_level];
  const levelStyle    = LEVEL_STYLES[career.academic_level];
  const formattedAffinity = CAREER_AFFINITY_FORMATTER.format(
    career.affinity / CAREER_AFFINITY_FORMAT_CONFIG.divisor,
  );

  const cardRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number; h: number } | null>(null);
  const [expanded, setExpanded] = useState(false);

  function handleMouseEnter(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as Element).closest(AFFINITY_UI_CONFIG.indicatorSelector)) return;
    if (!cardRef.current) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const r = cardRef.current.getBoundingClientRect();
    setTooltipPos({ x: r.left, y: r.top, h: r.height });
  }

  function handleMouseLeave() {
    setTooltipPos(null);
  }

  function handleAffinityTooltipVisibilityChange(isVisible: boolean) {
    setTooltipPos((currentPosition) => (isVisible ? null : currentPosition));
  }

  return (
    <>
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-full cursor-pointer rounded-xl border px-3 py-2.5 text-left shadow-sm transition-all hover:shadow-md ${
        isSelected ? "border-2" : "border-slate-100 bg-white"
      }`}
      style={
        isSelected
          ? { borderColor: overlay!.color, backgroundColor: overlay!.color + "18" }
          : undefined
      }
    >
      <div className="flex w-full items-center gap-3">
        {isSelected && (
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: overlay!.color }}
          />
        )}

        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">{career.title}</p>
            <span className={`mt-0.5 inline-block rounded border px-1.5 py-px text-[10px] font-medium ${levelStyle}`}>
              {levelLabel}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {affinityDisplayMode === CAREER_AFFINITY_DISPLAY_MODES.exact ? (
              <Badge
                variant="indigo"
                className="tabular-nums"
                aria-label={`${AFFINITY_COPY.ariaLabel}: ${formattedAffinity}`}
              >
                {formattedAffinity}
              </Badge>
            ) : (
              <AffinityIndicator
                affinity={career.affinity}
                onTooltipVisibilityChange={handleAffinityTooltipVisibilityChange}
              />
            )}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
              aria-label={`${
                expanded
                  ? CAREERS_PANEL_COPY.hideCareerDescription
                  : CAREERS_PANEL_COPY.showCareerDescription
              } ${career.title}`}
              className="[@media(hover:hover)]:hidden rounded-lg border border-slate-200 p-1 text-slate-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {onViewOfferings && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewOfferings();
                }}
                aria-label={`${CAREERS_PANEL_COPY.viewCareerOfferings} ${career.title}`}
                className="rounded-lg border border-slate-200 p-1 text-slate-400 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <p className="[@media(hover:hover)]:hidden mt-2 border-t border-slate-100 pt-2 text-[11px] leading-relaxed text-slate-600">
          {career.description}
        </p>
      )}
    </div>

    {tooltipPos && typeof window !== "undefined" && createPortal(
      <div
        className="animate-fade-in-opacity pointer-events-none relative rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-xl"
        style={{
          position: "fixed",
          right: window.innerWidth - tooltipPos.x + 10,
          top: tooltipPos.y + tooltipPos.h / 2,
          transform: "translateY(-50%)",
          zIndex: 200,
          maxWidth: "260px",
          minWidth: "180px",
        }}
      >
        <p className="text-[11px] leading-relaxed text-slate-600">{career.description}</p>
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
          style={{
            width: 0, height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "7px solid white",
            filter: "drop-shadow(1px 0 1px rgb(0 0 0 / 0.06))",
          }}
        />
      </div>,
      document.body
    )}
    </>
  );
}
