"use client";

import { useState } from "react";
import type { PersonalityList } from "@/types/test-results";
import { HEXACO_DIMENSIONS, type HexacoDimension } from "@/types/test-results";
import { SvgTooltip, scaledTooltipSize } from "@/features/results/components/svg-tooltip";
import { formatScore } from "@/features/results/lib/result-tier";

const CHART_W = 280;
const CHART_H = 150;
const PLOT = { left: 28, right: 268, top: 12, bottom: 118 };
const PLOT_H = PLOT.bottom - PLOT.top;
const PLOT_W = PLOT.right - PLOT.left;
const X_STEP = PLOT_W / (HEXACO_DIMENSIONS.length - 1);

// Scale that keeps the tooltip the same physical size as the radar chart tooltip (max-w-[320px])
// Formula: CHART_W(280) × radar_maxw(320) / hexaco_maxw(560) = 160
const { s: TOOLTIP_SCALE, w: TOOLTIP_W, h: TOOLTIP_H } = scaledTooltipSize(160);

const DIMENSION_NAMES: Record<HexacoDimension, string> = {
  H: "Honestidad",
  E: "Emocionalidad",
  X: "Extraversion",
  A: "Amabilidad",
  C: "Conciencia",
  O: "Apertura",
};

const GRID_VALUES = [0, 25, 50, 75, 100];
const CURVE_SAMPLES = 120;

function xAt(index: number): number {
  return PLOT.left + index * X_STEP;
}

function yAt(value: number): number {
  return PLOT.bottom - (Math.max(1, value) / 100) * PLOT_H;
}

/** Lagrange interpolation through the 6 data points. */
function lagrange(pts: { x: number; y: number }[], x: number): number {
  return pts.reduce((sum, pi, i) => {
    const basis = pts.reduce(
      (prod, pj, j) => (i === j ? prod : (prod * (x - pj.x)) / (pi.x - pj.x)),
      1,
    );
    return sum + pi.y * basis;
  }, 0);
}

function buildCurveSamples(pts: { x: number; y: number }[]): { x: number; y: number }[] {
  const xMin = pts[0].x;
  const xMax = pts[pts.length - 1].x;
  return Array.from({ length: CURVE_SAMPLES }, (_, i) => {
    const x = xMin + (i / (CURVE_SAMPLES - 1)) * (xMax - xMin);
    const y = Math.max(PLOT.top, Math.min(PLOT.bottom, lagrange(pts, x)));
    return { x, y };
  });
}

function buildLinePath(samples: { x: number; y: number }[]): string {
  return samples
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
}

function buildAreaPath(samples: { x: number; y: number }[]): string {
  const last = samples[samples.length - 1];
  const first = samples[0];
  return [
    buildLinePath(samples),
    `L ${last.x.toFixed(2)},${PLOT.bottom}`,
    `L ${first.x.toFixed(2)},${PLOT.bottom}`,
    "Z",
  ].join(" ");
}

interface TooltipState {
  dim: HexacoDimension;
  cx: number;
  cy: number;
}

function tooltipPos(cx: number, cy: number): { rx: number; ry: number } {
  const ry = cy < 44 ? cy + 8 : cy - TOOLTIP_H - 6;
  const rx = Math.max(PLOT.left, Math.min(PLOT.right - TOOLTIP_W, cx - TOOLTIP_W / 2));
  return { rx, ry };
}

interface HexacoChartProps {
  personality: PersonalityList;
}

export function HexacoChart({ personality }: HexacoChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const pts = HEXACO_DIMENSIONS.map((d, i) => ({
    x: xAt(i),
    y: yAt(personality[d]),
  }));

  const samples = buildCurveSamples(pts);
  const linePath = buildLinePath(samples);
  const areaPath = buildAreaPath(samples);

  return (
    <svg
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      className="w-full"
      role="img"
      aria-label="Perfil de personalidad HEXACO"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="hx-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.10)" />
        </filter>
      </defs>

      {GRID_VALUES.map((v) => (
        <line
          key={v}
          x1={PLOT.left}
          y1={yAt(v).toFixed(2)}
          x2={PLOT.right}
          y2={yAt(v).toFixed(2)}
          stroke={v === 0 ? "#94a3b8" : "#f1f5f9"}
          strokeWidth={v === 0 ? "1" : "0.75"}
        />
      ))}

      {GRID_VALUES.filter((v) => v > 0).map((v) => (
        <text
          key={v}
          x={PLOT.left - 4}
          y={yAt(v).toFixed(2)}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize="7"
          fill="#94a3b8"
        >
          {v}
        </text>
      ))}

      <path d={areaPath} fill="rgba(245,158,11,0.08)" />

      <path
        d={linePath}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {HEXACO_DIMENSIONS.map((dim, i) => {
        const cx = xAt(i);
        const cy = yAt(personality[dim]);
        const hovered = tooltip?.dim === dim;
        return (
          <circle
            key={dim}
            cx={cx.toFixed(2)}
            cy={cy.toFixed(2)}
            r={hovered ? "5" : "3.5"}
            fill={hovered ? "#d97706" : "#f59e0b"}
            stroke="white"
            strokeWidth="1.5"
            style={{ cursor: "default" }}
            onMouseEnter={() => setTooltip({ dim, cx, cy })}
            onMouseLeave={() => setTooltip(null)}
          />
        );
      })}

      {HEXACO_DIMENSIONS.map((dim, i) => (
        <text
          key={dim}
          x={xAt(i).toFixed(2)}
          y={PLOT.bottom + 13}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#475569"
        >
          {dim}
        </text>
      ))}

      {tooltip && (() => {
        const { rx, ry } = tooltipPos(tooltip.cx, tooltip.cy);
        return (
          <SvgTooltip
            x={rx} y={ry}
            value={formatScore(Math.max(1, personality[tooltip.dim]))}
            name={DIMENSION_NAMES[tooltip.dim]}
            scale={TOOLTIP_SCALE}
            accentColor="#b45309"
            borderColor="#fde68a"
            filterId="hx-shadow"
          />
        );
      })()}
    </svg>
  );
}
