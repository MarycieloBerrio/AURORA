"use client";

import { FloorConfig } from "@/constants/floors";

interface FloorIndicatorsProps {
  floors: FloorConfig[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function FloorIndicators({ floors, activeIndex, onSelect }: FloorIndicatorsProps) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Seleccionar piso">
      {floors.map((floor, i) => (
        <button
          key={floor.id}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={floor.nameEs}
          onClick={() => onSelect(i)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            i === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  );
}
