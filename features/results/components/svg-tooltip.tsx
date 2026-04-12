/**
 * Reusable SVG tooltip rendered as a <g> element.
 *
 * Width adapts to the name string so long career titles are never clipped.
 *
 * `scale` normalises sizes across charts with different viewBox widths:
 *   scale = viewBoxWidth / REFERENCE_VIEWBOX_W  (reference = 200)
 */

const REFERENCE_W = 200;

const BASE = {
  tooltipMinW: 82,
  tooltipH: 28,
  rx: 6,
  strokeW: 0.8,
  fontValue: 11,
  fontName: 8.5,
  avgCharW: 4.8,   // px per character at scale=1 for the 8.5px name font
  hPad: 16,        // total horizontal padding inside the tooltip
} as const;

/** Returns the scaled tooltip height (constant regardless of name length). */
export function scaledTooltipSize(viewBoxWidth: number) {
  const s = viewBoxWidth / REFERENCE_W;
  return { s, h: BASE.tooltipH * s };
}

/**
 * Estimates the rendered tooltip width for a given name at a given scale.
 * Use this wherever you need to position the tooltip (clamp logic, etc.).
 */
export function estimateTooltipWidth(name: string, scale = 1): number {
  const natural = name.length * BASE.avgCharW + BASE.hPad;
  return Math.max(BASE.tooltipMinW, natural) * scale;
}

interface SvgTooltipProps {
  x: number;
  y: number;
  value: string | number;
  name: string;
  scale?: number;
  accentColor: string;
  borderColor: string;
  filterId: string;
}

export function SvgTooltip({
  x, y, value, name,
  scale = 1,
  accentColor, borderColor, filterId,
}: SvgTooltipProps) {
  const w = estimateTooltipWidth(name, scale);
  const h = BASE.tooltipH * scale;
  const midX = x + w / 2;

  return (
    <g pointerEvents="none">
      <rect
        x={x} y={y}
        width={w} height={h}
        rx={BASE.rx * scale}
        fill="white"
        stroke={borderColor}
        strokeWidth={BASE.strokeW * scale}
        filter={`url(#${filterId})`}
      />
      <text
        x={midX} y={y + h * 0.42}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={BASE.fontValue * scale}
        fontWeight="800"
        fill={accentColor}
      >
        {value}
      </text>
      <text
        x={midX} y={y + h * 0.80}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={BASE.fontName * scale}
        fill="#64748b"
      >
        {name}
      </text>
    </g>
  );
}
