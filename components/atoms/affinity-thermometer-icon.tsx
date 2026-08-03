import type { SVGProps } from "react";
import type { AffinityThermometerLevel } from "@/features/results/constants/affinity-categories";

const THERMOMETER_GEOMETRY = {
  fluidBottom: 13,
  fluidWidth: 2,
  maximumFluidHeight: 8,
  levelCount: 4,
  tubeX: 9,
} as const;

interface AffinityThermometerIconProps extends Omit<SVGProps<SVGSVGElement>, "level"> {
  level: AffinityThermometerLevel;
}

export function AffinityThermometerIcon({
  level,
  className = "h-5 w-5",
  ...props
}: AffinityThermometerIconProps) {
  const fluidHeight =
    (THERMOMETER_GEOMETRY.maximumFluidHeight * level) / THERMOMETER_GEOMETRY.levelCount;
  const fluidY = THERMOMETER_GEOMETRY.fluidBottom - fluidHeight;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 20 20"
      className={className}
      {...props}
    >
      <path
        d="M10 2.5A2.5 2.5 0 0 0 7.5 5v6.16a4 4 0 1 0 5 0V5A2.5 2.5 0 0 0 10 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.45"
      />
      <rect
        x={THERMOMETER_GEOMETRY.tubeX}
        y={fluidY}
        width={THERMOMETER_GEOMETRY.fluidWidth}
        height={fluidHeight}
        rx="1"
        fill="currentColor"
      />
      <circle cx="10" cy="15" r="2.5" fill="currentColor" />
    </svg>
  );
}
