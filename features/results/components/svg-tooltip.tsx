/**
 * Reusable SVG tooltip rendered as a <g> element.
 *
 * `scale` normalises sizes across charts with different viewBox widths:
 *   scale = viewBoxWidth / REFERENCE_VIEWBOX_W  (reference = 200)
 *
 * This ensures both RadarChart (viewBox 200) and HexacoChart (viewBox 280)
 * produce tooltips of equal physical CSS-pixel size when rendered at the
 * same container width.
 */

const REFERENCE_W = 200;

/** Base dimensions at scale 1.0 (RadarChart 200-wide viewBox). */
const BASE = {
  tooltipW: 82,
  tooltipH: 28,
  rx: 6,
  strokeW: 0.8,
  fontValue: 11,
  fontName: 8.5,
};

export function scaledTooltipSize(viewBoxWidth: number) {
  const s = viewBoxWidth / REFERENCE_W;
  return {
    s,
    w: BASE.tooltipW * s,
    h: BASE.tooltipH * s,
  };
}

interface SvgTooltipProps {
  /** Top-left corner of the tooltip rectangle in SVG units. */
  x: number;
  y: number;
  /** Tooltip value line (bold, accent colour). */
  value: string | number;
  /** Tooltip name line (smaller, slate). */
  name: string;
  /**
   * Scale factor = viewBoxWidth / 200.
   * RadarChart (200 wide) → 1.0
   * HexacoChart (280 wide) → 1.4
   */
  scale?: number;
  /** Hex/rgb colour for the value text and border. */
  accentColor: string;
  borderColor: string;
  /** `id` of a pre-defined <filter> in the parent <defs>. */
  filterId: string;
}

export function SvgTooltip({
  x,
  y,
  value,
  name,
  scale = 1,
  accentColor,
  borderColor,
  filterId,
}: SvgTooltipProps) {
  const w = BASE.tooltipW * scale;
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
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={BASE.fontValue * scale}
        fontWeight="800"
        fill={accentColor}
      >
        {value}
      </text>
      <text
        x={midX} y={y + h * 0.80}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={BASE.fontName * scale}
        fill="#64748b"
      >
        {name}
      </text>
    </g>
  );
}
