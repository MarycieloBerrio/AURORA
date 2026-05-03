"use client";

type AccentColor = "blue" | "amber" | "emerald";

const FILL_PALETTE: Record<AccentColor, { negative: string; neutral: string; positive: string }> = {
  blue:    { negative: "#f43f5e", neutral: "#94a3b8", positive: "#2563eb" },
  amber:   { negative: "#38bdf8", neutral: "#94a3b8", positive: "#f59e0b" },
  emerald: { negative: "#f43f5e", neutral: "#94a3b8", positive: "#10b981" },
};

const TRACK_EMPTY = "#e2e8f0";

function lerpColor(a: string, b: string, t: number): string {
  const ch = (hex: string, offset: number) => parseInt(hex.slice(offset, offset + 2), 16);
  const r = Math.round(ch(a, 1) + (ch(b, 1) - ch(a, 1)) * t);
  const g = Math.round(ch(a, 3) + (ch(b, 3) - ch(a, 3)) * t);
  const bl = Math.round(ch(a, 5) + (ch(b, 5) - ch(a, 5)) * t);
  return `rgb(${r},${g},${bl})`;
}

function getFillColor(percent: number, accentColor: AccentColor): string {
  const { negative, neutral, positive } = FILL_PALETTE[accentColor];
  if (percent <= 50) return lerpColor(negative, neutral, percent / 50);
  return lerpColor(neutral, positive, (percent - 50) / 50);
}

interface LikertSliderProps {
  value?: number;
  onChange: (value: number) => void;
  accentColor: AccentColor;
}

export function LikertSlider({ value, onChange, accentColor }: LikertSliderProps) {
  const isAnswered = value !== undefined;
  const displayValue = value ?? 50;
  const fillColor = isAnswered ? getFillColor(displayValue, accentColor) : TRACK_EMPTY;

  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={0}
        max={100}
        value={displayValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 flex-1 cursor-pointer appearance-none rounded-full"
        style={{
          accentColor: fillColor,
          background: isAnswered
            ? `linear-gradient(to right, ${fillColor} ${displayValue}%, ${TRACK_EMPTY} ${displayValue}%)`
            : TRACK_EMPTY,
        }}
      />
      <span
        className="w-11 shrink-0 text-right text-sm font-bold tabular-nums transition-colors duration-100"
        style={{ color: isAnswered ? fillColor : "#94a3b8" }}
      >
        {isAnswered ? `${displayValue}%` : "—"}
      </span>
    </div>
  );
}
