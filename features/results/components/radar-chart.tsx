"use client";

import { useState } from "react";
import type { InterestsList } from "@/types/test-results";
import type { CareerOverlay } from "@/features/results/lib/career-colors";
import { FloatingTooltip } from "@/features/results/components/floating-tooltip";
import { formatScore } from "@/features/results/lib/result-tier";

const SIZE = 200;
const CENTER = SIZE / 2;
const MAX_RADIUS = 78;
const LABEL_RADIUS = 92;
const RING_FRACTIONS = [0.25, 0.5, 0.75, 1.0];
const AXIS_COUNT = 6;
const ANGLE_STEP = (Math.PI * 2) / AXIS_COUNT;
const START_ANGLE = -Math.PI / 2;

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

function userPolygonPoints(interests: InterestsList): string {
  return toPolygonPoints(
    DIMENSION_ORDER.map((dim, i) => pointAt((MAX_RADIUS * interests[dim]) / 100, i)),
  );
}

function overlayPolygonPoints(overlay: CareerOverlay): string {
  return toPolygonPoints(
    DIMENSION_ORDER.map((dim, i) => pointAt(MAX_RADIUS * overlay.career.interests[dim], i)),
  );
}

function overlayVertices(overlay: CareerOverlay): Array<{ x: number; y: number }> {
  return DIMENSION_ORDER.map((dim, i) => pointAt(MAX_RADIUS * overlay.career.interests[dim], i));
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: string;
  color: string;
}

interface RadarChartProps {
  interests: InterestsList;
  overlays?: CareerOverlay[];
}

export function RadarChart({ interests, overlays = [] }: RadarChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[320px] mx-auto"
        role="img"
        aria-label="Perfil de intereses RIASEC"
        style={{ overflow: "visible" }}
      >
        {RING_FRACTIONS.map((f) => (
          <polygon key={f} points={ringPoints(f)} fill="none" stroke="#e2e8f0" strokeWidth="1" />
        ))}

        {DIMENSION_ORDER.map((_, i) => {
          const end = pointAt(MAX_RADIUS, i);
          return (
            <line
              key={i}
              x1={CENTER} y1={CENTER}
              x2={end.x.toFixed(2)} y2={end.y.toFixed(2)}
              stroke="#e2e8f0" strokeWidth="1"
            />
          );
        })}

        <polygon
          points={userPolygonPoints(interests)}
          fill="rgba(99,102,241,0.2)"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {overlays.map((ov) => (
          <polygon
            key={ov.career.onetsoc_code}
            points={overlayPolygonPoints(ov)}
            fill="none"
            stroke={ov.color}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            strokeLinejoin="round"
          />
        ))}

        {overlays.map((ov) =>
          overlayVertices(ov).map((pt, i) => {
            const dim = DIMENSION_ORDER[i];
            const pct = Math.round(ov.career.interests[dim] * 100);
            return (
              <circle
                key={`${ov.career.onetsoc_code}-${dim}`}
                cx={pt.x.toFixed(2)} cy={pt.y.toFixed(2)}
                r="3.5"
                fill={ov.color}
                stroke="white" strokeWidth="1.5"
                style={{ cursor: "default" }}
                onMouseEnter={(e) =>
                  setTooltip({ x: e.clientX, y: e.clientY, label: ov.career.title, value: `${pct}%`, color: ov.color })
                }
                onMouseMove={(e) =>
                  setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
                }
                onMouseLeave={() => setTooltip(null)}
              />
            );
          }),
        )}

        {DIMENSION_ORDER.map((dim, i) => {
          const r = (MAX_RADIUS * interests[dim]) / 100;
          const p = pointAt(r, i);
          const hovered = tooltip?.label === DIMENSION_NAMES[dim] && tooltip?.color === "#4f46e5";
          return (
            <circle
              key={dim}
              cx={p.x.toFixed(2)} cy={p.y.toFixed(2)}
              r={hovered ? "5.5" : "3.5"}
              fill={hovered ? "#4f46e5" : "#6366f1"}
              stroke="white" strokeWidth={hovered ? "1.5" : "0"}
              style={{ cursor: "default" }}
              onMouseEnter={(e) =>
                setTooltip({ x: e.clientX, y: e.clientY, label: DIMENSION_NAMES[dim], value: formatScore(interests[dim]), color: "#4f46e5" })
              }
              onMouseMove={(e) =>
                setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
              }
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}

        {DIMENSION_ORDER.map((dim, i) => {
          const p = pointAt(LABEL_RADIUS, i);
          return (
            <text
              key={dim}
              x={p.x.toFixed(2)} y={p.y.toFixed(2)}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontWeight="700" fill="#475569"
            >
              {dim}
            </text>
          );
        })}
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
