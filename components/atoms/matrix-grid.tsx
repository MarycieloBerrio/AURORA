const MISSING_CELL = "?";

/**
 * Unicode geometric symbols have very different visual weights at the same font-size.
 * These sizes are calibrated so •, ▲, ■ and ♦ appear roughly the same visual height.
 */
const SINGLE_SYMBOL_SIZE: Record<string, string> = {
  "•": "2.2rem",  // bullet is inherently tiny — needs ~2× the size of a square
  "▲": "1.5rem",  // triangle slightly smaller than square visually
  "■": "1.15rem", // square fills its bounding box completely — keep it smaller
  "♦": "1.6rem",  // diamond sits between bullet and square
};

function cellStyle(cell: string): React.CSSProperties {
  if (cell === MISSING_CELL) return {};
  const fontSize = SINGLE_SYMBOL_SIZE[cell];
  return fontSize ? { fontSize } : {};
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
          style={cellStyle(cell)}
          className={`flex min-h-[72px] items-center justify-center border border-slate-200 p-4 text-center font-medium ${
            cell === MISSING_CELL
              ? "bg-indigo-50 text-3xl font-bold text-indigo-500"
              : "text-lg text-slate-800"
          }`}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
