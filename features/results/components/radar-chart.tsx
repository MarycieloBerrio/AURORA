"use client";

import { useState } from "react";
import type { InterestsList } from "@/types/test-results";
import { SvgTooltip, scaledTooltipSize } from "@/features/results/components/svg-tooltip";
import { formatScore } from "@/features/results/lib/result-tier";

const SIZE = 200;
const CENTER = SIZE / 2;
const MAX_RADIUS = 78;
const LABEL_RADIUS = 92;
const RING_FRACTIONS = [0.25, 0.5, 0.75, 1.0];
const AXIS_COUNT = 6;
const ANGLE_STEP = (Math.PI * 2) / AXIS_COUNT;
const START_ANGLE = -Math.PI / 2;

const { s: TOOLTIP_SCALE, w: TOOLTIP_W, h: TOOLTIP_H } = scaledTooltipSize(SIZE);

const DIMENSION_NAMES: Record<keyof InterestsList, string> = {
  R: "Realista",
  I: "Investigativo",
  A: "Artistico",
  S: "Social",
  E: "Emprendedor",
  C: "Convencional",
};

const DIMENSION_ORDER: (keyof InterestsList)[] = ["R", "I", "A", "S", "E", "C"];

function axisAngle(index: number): number {
  return START_ANGLE + index * ANGLE_STEP;
}

function pointAt(radius: number, index: number): { x: number; y: number } {
  const angle = axisAngle(index);
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function toPolygonPoints(coords: Array<{ x: number; y: number }>): string {
  return coords.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

function ringPoints(fraction: number): string {
  const r = MAX_RADIUS * fraction;
  return toPolygonPoints(Array.from({ length: AXIS_COUNT }, (_, i) => pointAt(r, i)));
}

function dataPoints(interests: InterestsList): string {
  return toPolygonPoints(
    DIMENSION_ORDER.map((dim, i) => {
      const r = (MAX_RADIUS * interests[dim]) / 100;
      return pointAt(r, i);
    }),
  );
}

interface TooltipState {
  dim: keyof InterestsList;
  cx: number;
  cy: number;
}

function tooltipPos(cx: number, cy: number): { rx: number; ry: number } {
  const ry = cy < CENTER ? cy + 10 : cy - TOOLTIP_H - 8;
  const rx = Math.max(2, Math.min(SIZE - TOOLTIP_W - 2, cx - TOOLTIP_W / 2));
  return { rx, ry };
}

interface RadarChartProps {
  interests: InterestsList;
}

export function RadarChart({ interests }: RadarChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-[320px] mx-auto"
      role="img"
      aria-label="Perfil de intereses RIASEC"
    >
      <defs>
        <filter id="rc-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.10)" />
        </filter>
      </defs>

      {RING_FRACTIONS.map((f) => (
        <polygon key={f} points={ringPoints(f)} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}

      {DIMENSION_ORDER.map((_, i) => {
        const end = pointAt(MAX_RADIUS, i);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={end.x.toFixed(2)}
            y2={end.y.toFixed(2)}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={dataPoints(interests)}
        fill="rgba(99,102,241,0.2)"
        stroke="#6366f1"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {DIMENSION_ORDER.map((dim, i) => {
        const r = (MAX_RADIUS * interests[dim]) / 100;
        const p = pointAt(r, i);
        const hovered = tooltip?.dim === dim;
        return (
          <circle
            key={dim}
            cx={p.x.toFixed(2)}
            cy={p.y.toFixed(2)}
            r={hovered ? "5.5" : "3.5"}
            fill={hovered ? "#4f46e5" : "#6366f1"}
            stroke="white"
            strokeWidth={hovered ? "1.5" : "0"}
            style={{ cursor: "default" }}
            onMouseEnter={() => setTooltip({ dim, cx: p.x, cy: p.y })}
            onMouseLeave={() => setTooltip(null)}
          />
        );
      })}

      {DIMENSION_ORDER.map((dim, i) => {
        const p = pointAt(LABEL_RADIUS, i);
        return (
          <text
            key={dim}
            x={p.x.toFixed(2)}
            y={p.y.toFixed(2)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="700"
            fill="#475569"
          >
            {dim}
          </text>
        );
      })}

      {tooltip && (() => {
        const { rx, ry } = tooltipPos(tooltip.cx, tooltip.cy);
        return (
          <SvgTooltip
            x={rx} y={ry}
            value={formatScore(interests[tooltip.dim])}
            name={DIMENSION_NAMES[tooltip.dim]}
            scale={TOOLTIP_SCALE}
            accentColor="#4f46e5"
            borderColor="#e0e7ff"
            filterId="rc-shadow"
          />
        );
      })()}
    </svg>
  );
}
