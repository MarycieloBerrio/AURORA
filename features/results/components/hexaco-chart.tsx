"use client";

import { useState } from "react";
import type { PersonalityList } from "@/types/test-results";
import { HEXACO_DIMENSIONS, type HexacoDimension } from "@/types/test-results";
import type { CareerOverlay } from "@/features/results/lib/career-colors";
import { FloatingTooltip } from "@/features/results/components/floating-tooltip";
import { formatScore } from "@/features/results/lib/result-tier";

const CHART_W = 280;
const CHART_H = 150;
const PLOT = { left: 28, right: 268, top: 12, bottom: 118 };
const PLOT_H = PLOT.bottom - PLOT.top;
const PLOT_W = PLOT.right - PLOT.left;
const X_STEP = PLOT_W / (HEXACO_DIMENSIONS.length - 1);

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
  const last  = samples[samples.length - 1];
  const first = samples[0];
  return [
    buildLinePath(samples),
    `L ${last.x.toFixed(2)},${PLOT.bottom}`,
    `L ${first.x.toFixed(2)},${PLOT.bottom}`,
    "Z",
  ].join(" ");
}

function buildOverlayCurve(overlay: CareerOverlay): string {
  const pts = HEXACO_DIMENSIONS.map((d, i) => ({
    x: xAt(i),
    y: yAt(overlay.career.personality[d] * 100),
  }));
  return buildLinePath(buildCurveSamples(pts));
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: string;
  color: string;
}

interface HexacoChartProps {
  personality: PersonalityList;
  overlays?: CareerOverlay[];
}

export function HexacoChart({ personality, overlays = [] }: HexacoChartProps) {
  const [tooltip,        setTooltip]        = useState<TooltipState | null>(null);
  const [hoveredOverlay, setHoveredOverlay] = useState<string | null>(null);

  const pts = HEXACO_DIMENSIONS.map((d, i) => ({ x: xAt(i), y: yAt(personality[d]) }));
  const samples  = buildCurveSamples(pts);
  const linePath = buildLinePath(samples);
  const areaPath = buildAreaPath(samples);

  return (
    <>
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
          <g key={v}>
            <line
              x1={PLOT.left} y1={yAt(v).toFixed(2)}
              x2={PLOT.right} y2={yAt(v).toFixed(2)}
              stroke={v === 0 ? "#94a3b8" : "#f1f5f9"}
              strokeWidth={v === 0 ? "1" : "0.75"}
            />
            {v > 0 && (
              <text
                x={PLOT.left - 4} y={yAt(v).toFixed(2)}
                textAnchor="end" dominantBaseline="middle"
                fontSize="7" fill="#94a3b8"
              >
                {v}
              </text>
            )}
          </g>
        ))}

        <path d={areaPath} fill="rgba(245,158,11,0.08)" />

        <path
          d={linePath} fill="none"
          stroke="#f59e0b" strokeWidth="2"
          strokeLinejoin="round" strokeLinecap="round"
        />

        {overlays.map((ov) => {
          const isHovered = hoveredOverlay === ov.career.onetsoc_code;
          const curvePath = buildOverlayCurve(ov);
          return (
            <g
              key={ov.career.onetsoc_code}
              opacity={isHovered ? 1 : 0.6}
              style={{ transition: "opacity 0.15s ease" }}
            >
              {/* Visible dashed curve */}
              <path
                d={curvePath}
                fill="none"
                stroke={ov.color}
                strokeWidth="1.5"
                strokeDasharray="4 2"
                strokeLinejoin="round"
                strokeLinecap="round"
                pointerEvents="none"
              />
              {/* Wide invisible hit area */}
              <path
                d={curvePath}
                fill="none"
                stroke="transparent"
                strokeWidth="12"
                onMouseEnter={() => setHoveredOverlay(ov.career.onetsoc_code)}
                onMouseLeave={() => setHoveredOverlay(null)}
              />
              {/* Dimension dots */}
              {HEXACO_DIMENSIONS.map((dim, i) => {
                const cx  = xAt(i);
                const cy  = yAt(ov.career.personality[dim] * 100);
                const pct = Math.round(ov.career.personality[dim] * 100);
                return (
                  <circle
                    key={`${ov.career.onetsoc_code}-${dim}`}
                    cx={cx.toFixed(2)} cy={cy.toFixed(2)}
                    r="3"
                    fill={ov.color}
                    stroke="white" strokeWidth="1.5"
                    style={{ cursor: "default" }}
                    onMouseEnter={(e) => {
                      setHoveredOverlay(ov.career.onetsoc_code);
                      setTooltip({ x: e.clientX, y: e.clientY, label: ov.career.title, value: `${pct}%`, color: ov.color });
                    }}
                    onMouseMove={(e) =>
                      setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
                    }
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
            </g>
          );
        })}

        {HEXACO_DIMENSIONS.map((dim, i) => {
          const cx = xAt(i);
          const cy = yAt(personality[dim]);
          const hovered = tooltip?.label === DIMENSION_NAMES[dim] && tooltip?.color === "#b45309";
          return (
            <circle
              key={dim}
              cx={cx.toFixed(2)} cy={cy.toFixed(2)}
              r={hovered ? "5" : "3.5"}
              fill={hovered ? "#d97706" : "#f59e0b"}
              stroke="white" strokeWidth="1.5"
              style={{ cursor: "default" }}
              onMouseEnter={(e) =>
                setTooltip({ x: e.clientX, y: e.clientY, label: DIMENSION_NAMES[dim], value: formatScore(Math.max(1, personality[dim])), color: "#b45309" })
              }
              onMouseMove={(e) =>
                setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
              }
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}

        {HEXACO_DIMENSIONS.map((dim, i) => (
          <text
            key={dim}
            x={xAt(i).toFixed(2)} y={PLOT.bottom + 13}
            textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569"
          >
            {dim}
          </text>
        ))}
      </svg>

      {tooltip && (
        <FloatingTooltip
          x={tooltip.x} y={tooltip.y}
          label={tooltip.label}
          value={tooltip.value}
          color={tooltip.color}
        />
      )}
    </>
  );
}
