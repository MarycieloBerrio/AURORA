"use client";

import { useState } from "react";
import type { SkillsDict } from "@/types/test-results";
import type { CareerOverlay } from "@/features/results/lib/career-colors";
import { FloatingTooltip } from "@/features/results/components/floating-tooltip";

const CHART_W = 300;
const CHART_H = 180;
const PLOT = { left: 28, right: 294, top: 10, bottom: 144 } as const;
const PLOT_H = PLOT.bottom - PLOT.top;
const PLOT_W = PLOT.right - PLOT.left;

const SKILL_KEYS: (keyof SkillsDict)[] = ["RC", "DR", "IR", "MR", "SR", "SA"];
const SKILL_LABELS: Record<keyof SkillsDict, string> = {
  RC: "C. Lectora",
  DR: "Deductivo",
  IR: "Inductivo",
  MR: "Matemático",
  SR: "Espacial",
  SA: "Atención",
};

const GROUP_W = PLOT_W / SKILL_KEYS.length;
const BAR_W   = 8;
const BAR_GAP = 2;

const GRID_VALUES = [0, 25, 50, 75, 100];
const USER_COLOR  = "#6366f1";

function yAt(pct: number): number {
  return PLOT.bottom - (pct / 100) * PLOT_H;
}

function groupCenterX(index: number): number {
  return PLOT.left + (index + 0.5) * GROUP_W;
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: string;
  color: string;
}

interface AptitudeChartProps {
  skills: SkillsDict;
  overlays?: CareerOverlay[];
}

export function AptitudeChart({ skills, overlays = [] }: AptitudeChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        role="img"
        aria-label="Gráfico de aptitudes"
        style={{ overflow: "visible" }}
      >
        {GRID_VALUES.map((v) => (
          <g key={v}>
            <line
              x1={PLOT.left} y1={yAt(v).toFixed(2)}
              x2={PLOT.right} y2={yAt(v).toFixed(2)}
              stroke={v === 0 ? "#cbd5e1" : "#f1f5f9"}
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

        {SKILL_KEYS.map((key, i) => {
          const userPct   = Math.round(skills[key] * 100);
          const cx        = groupCenterX(i);
          const totalBars = 1 + overlays.length;
          const groupBarW = totalBars * BAR_W + (totalBars - 1) * BAR_GAP;
          const startX    = cx - groupBarW / 2;

          return (
            <g key={key}>
              <rect
                x={startX.toFixed(2)}
                y={yAt(userPct).toFixed(2)}
                width={BAR_W}
                height={Math.max(1, (userPct / 100) * PLOT_H).toFixed(2)}
                rx="2"
                fill={USER_COLOR}
                opacity="0.85"
                style={{ cursor: "default" }}
                onMouseEnter={(e) =>
                  setTooltip({ x: e.clientX, y: e.clientY, label: "Tú", value: `${userPct}%`, color: USER_COLOR })
                }
                onMouseMove={(e) =>
                  setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
                }
                onMouseLeave={() => setTooltip(null)}
              />

              {overlays.map((ov, oi) => {
                const careerPct = Math.round(ov.career.skills[key] * 100);
                const barX      = startX + (1 + oi) * (BAR_W + BAR_GAP);
                return (
                  <rect
                    key={ov.career.onetsoc_code}
                    x={barX.toFixed(2)}
                    y={yAt(careerPct).toFixed(2)}
                    width={BAR_W}
                    height={Math.max(1, (careerPct / 100) * PLOT_H).toFixed(2)}
                    rx="2"
                    fill={ov.color}
                    opacity="0.80"
                    style={{ cursor: "default" }}
                    onMouseEnter={(e) =>
                      setTooltip({ x: e.clientX, y: e.clientY, label: ov.career.title, value: `${careerPct}%`, color: ov.color })
                    }
                    onMouseMove={(e) =>
                      setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
                    }
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}

              <text
                x={cx.toFixed(2)} y={PLOT.bottom + 10}
                textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#475569"
              >
                {key}
              </text>
              <text
                x={cx.toFixed(2)} y={PLOT.bottom + 20}
                textAnchor="middle" fontSize="6.5" fill="#94a3b8"
              >
                {SKILL_LABELS[key]}
              </text>
            </g>
          );
        })}

        {overlays.length > 0 && (
          <g>
            <rect x={PLOT.left} y={CHART_H - 10} width={8} height={6} rx="1.5" fill={USER_COLOR} opacity="0.85" />
            <text x={PLOT.left + 11} y={CHART_H - 5} fontSize="7" fill="#475569">Tú</text>
            {overlays.map((ov, i) => {
              const lx = PLOT.left + 30 + i * 70;
              return (
                <g key={ov.career.onetsoc_code}>
                  <rect x={lx} y={CHART_H - 10} width={8} height={6} rx="1.5" fill={ov.color} opacity="0.80" />
                  <text x={lx + 11} y={CHART_H - 5} fontSize="7" fill="#475569">
                    {ov.career.title.length > 12 ? ov.career.title.slice(0, 11) + "…" : ov.career.title}
                  </text>
                </g>
              );
            })}
          </g>
        )}
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
