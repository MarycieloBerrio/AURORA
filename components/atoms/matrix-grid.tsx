const MISSING_CELL = "?";

/**
 * Unicode geometric symbols have very different visual weights at the same font-size.
 * Calibrated so •, ▲, ■ and ♦ appear roughly the same visual height inside matrix cells.
 */
const SYMBOL_SIZES: Record<string, string> = {
  "•": "2.2rem",  // bullet is inherently tiny — needs ~2× the size of a square
  "▲": "1.5rem",  // triangle slightly smaller than square visually
  "■": "1.15rem", // square fills its bounding box completely — keep it smaller
  "♦": "1.6rem",  // diamond sits between bullet and square
};

/** Renders cell text with per-character size normalization for known symbols. */
function CellContent({ value }: { value: string }) {
  const chars = [...value];
  if (!chars.some((c) => c in SYMBOL_SIZES)) return <>{value}</>;

  return (
    <span className="inline-flex items-center leading-none">
      {chars.map((char, i) => (
        <span key={i} style={{ fontSize: SYMBOL_SIZES[char] }} className="leading-none">
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
