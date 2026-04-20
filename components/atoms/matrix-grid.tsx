const MISSING_CELL = "?";

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
          className={`flex items-center justify-center border border-slate-200 p-3 text-center text-sm font-medium ${
            cell === MISSING_CELL
              ? "bg-indigo-50 text-2xl font-bold text-indigo-500"
              : "text-slate-800"
          }`}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
