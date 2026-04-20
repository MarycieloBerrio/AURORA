const MISSING_CELL = "?";

/**
 * Unicode geometric symbols have very different visual weights at the same font-size.
 * Calibrated empirically: ▲ renders ~3× larger than • and ~2× larger than ■ in most
 * system fonts, so we compensate with per-symbol font sizes.
 */
const SYMBOL_SIZES: Record<string, string> = {
  "•": "2.8rem",   // bullet is tiny — push it up significantly
  "▲": "1.0rem",   // triangle renders very large — cut it down
  "■": "1.35rem",  // square is the visual middle ground
  "♦": "1.4rem",
};

/** Renders cell text with per-character size normalization for known symbols. */
function CellContent({ value }: { value: string }) {
  const chars = [...value];
  if (!chars.some((c) => c in SYMBOL_SIZES)) return <>{value}</>;

  return (
    <span className="inline-flex items-center leading-none">
      {chars.map((char, i) => (
        <span
          key={i}
          style={{ fontSize: SYMBOL_SIZES[char] }}
          className="leading-none"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

interface MatrixGridProps {
  cells: string[][];
}

export function MatrixGrid({ cells }: MatrixGridProps) {
  const cols = cells[0]?.length ?? 3;

  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-slate-300"
      style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells.flat().map((cell, i) => (
        <div
          key={i}
          className={`flex min-h-[72px] items-center justify-center border border-slate-200 p-4 text-center font-medium ${
            cell === MISSING_CELL
              ? "bg-indigo-50 text-3xl font-bold text-indigo-500"
              : "text-lg text-slate-800"
          }`}
        >
          {cell === MISSING_CELL ? cell : <CellContent value={cell} />}
        </div>
      ))}
    </div>
  );
}
