"use client";

/**
 * Unicode geometric symbols have very different visual weights at the same font-size.
 * Calibrated empirically: ▲ renders ~3× larger than • and ~2× larger than ■ in most
 * system fonts, so we compensate with per-symbol font sizes.
 */
const SYMBOL_SIZES: Record<string, string> = {
  "•": "3.8rem",   // U+2022 BULLET — tiny, push it up significantly
  "●": "1.85rem",  // U+25CF BLACK CIRCLE — similar visual weight to ■
  "▲": "1.35rem",  // triangle renders very large — cut it down
  "■": "1.85rem",  // square is the visual middle ground
  "♦": "2.0rem",
};

/** Renders option text with per-character size normalization for known symbols. */
function OptionText({ value }: { value: string }) {
  const chars = [...value];
  if (!chars.some((c) => c in SYMBOL_SIZES)) {
    return <span className="text-xl font-bold text-slate-800">{value}</span>;
  }

  return (
    <span className="inline-flex items-center leading-none">
      {chars.map((char, i) => (
        <span
          key={i}
          style={{ fontSize: SYMBOL_SIZES[char] }}
          className="font-bold leading-none text-slate-800"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

interface TextGridOptionProps {
  text: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TextGridOption({ text, label, isSelected, onClick }: TextGridOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex aspect-square w-full items-center justify-center rounded-xl border-2 transition ${
        isSelected
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span
        className={`absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          isSelected ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        {label}
      </span>
      <OptionText value={text} />
    </button>
  );
}
