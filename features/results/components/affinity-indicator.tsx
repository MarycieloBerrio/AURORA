"use client";

import {
  useId,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { AffinityThermometerIcon } from "@/components/atoms/affinity-thermometer-icon";
import { FloatingTooltip } from "@/features/results/components/floating-tooltip";
import { AFFINITY_COPY } from "@/features/results/constants/affinity-categories";
import { resolveAffinityCategory } from "@/features/results/lib/career-groups";

interface TooltipPosition {
  x: number;
  y: number;
}

interface AffinityIndicatorProps {
  affinity: number;
  onTooltipVisibilityChange?: (isVisible: boolean) => void;
}

export function AffinityIndicator({
  affinity,
  onTooltipVisibilityChange,
}: AffinityIndicatorProps) {
  const category = resolveAffinityCategory(affinity);
  const tooltipId = useId();
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);

  function showTooltip(x: number, y: number) {
    setTooltipPosition({ x, y });
    onTooltipVisibilityChange?.(true);
  }

  function handleMouseEnter(event: MouseEvent<HTMLSpanElement>) {
    showTooltip(event.clientX, event.clientY);
  }

  function handleMouseMove(event: MouseEvent<HTMLSpanElement>) {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }

  function handleFocus(event: FocusEvent<HTMLSpanElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    showTooltip(bounds.left + bounds.width / 2, bounds.top);
  }

  function hideTooltip() {
    setTooltipPosition(null);
    onTooltipVisibilityChange?.(false);
  }

  function stopCardInteraction(event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>) {
    event.stopPropagation();
  }

  return (
    <>
      <span
        data-affinity-indicator="true"
        role="img"
        tabIndex={0}
        aria-label={`${AFFINITY_COPY.ariaLabel}: ${category.label}`}
        aria-describedby={tooltipPosition ? tooltipId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={hideTooltip}
        onFocus={handleFocus}
        onBlur={hideTooltip}
        onClick={stopCardInteraction}
        onKeyDown={stopCardInteraction}
        className={`inline-flex rounded-lg border p-1 ${category.colorClassName} ${category.surfaceClassName}`}
      >
        <AffinityThermometerIcon level={category.thermometerLevel} />
      </span>

      {tooltipPosition ? (
        <FloatingTooltip
          id={tooltipId}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
          label={category.label}
        />
      ) : null}
    </>
  );
}
