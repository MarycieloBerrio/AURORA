"use client";

import { useState, useRef } from "react";
import { FloorTestBubble } from "@/components/molecules/floor-test-bubble";
import type { FloorConfig } from "@/constants/floors";

const PANEL_COUNT = 3;
const SWIPE_THRESHOLD_PX = 50;

/** background-position for each of the 3 panels (left / center / right third). */
const BG_POSITIONS = ["0% center", "50% center", "100% center"] as const;

/** x-range [min, max) each panel covers, as a percentage of the floor image. */
const PANEL_X_BOUNDS = [
  { min: 0, max: 33.33 },
  { min: 33.33, max: 66.67 },
  { min: 66.67, max: 100 },
];

interface FloorMobileCarouselProps {
  floor: FloorConfig;
  completionMap: Record<string, boolean>;
}

export function FloorMobileCarousel({ floor, completionMap }: FloorMobileCarouselProps) {
  const [panel, setPanel] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -SWIPE_THRESHOLD_PX && panel < PANEL_COUNT - 1) setPanel((p) => p + 1);
    if (dx > SWIPE_THRESHOLD_PX && panel > 0) setPanel((p) => p - 1);
    touchStartX.current = null;
  };

  const bounds = PANEL_X_BOUNDS[panel];
  const panelTests = floor.tests.filter(
    (t) => t.position.x >= bounds.min && t.position.x < bounds.max,
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background: zoomed-in third of the floor image */}
      <div
        className="absolute inset-0 transition-[background-position] duration-300"
        style={{
          backgroundImage: `url(${floor.imageSrc})`,
          backgroundSize: "300% auto",
          backgroundPosition: BG_POSITIONS[panel],
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0f172a", // slate-900 letterbox
        }}
      />

      {/* Test bubbles for this panel, with x remapped to [0-100]% within the panel */}
      {panelTests.map((test) => {
        const overrideX = ((test.position.x - panel * 33.33) / 33.33) * 100;
        return (
          <FloorTestBubble
            key={test.id}
            test={test}
            completed={completionMap[test.id] ?? false}
            overrideX={overrideX}
          />
        );
      })}

      {/* Panel label */}
      <div className="absolute left-3 top-3 z-20 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {panel === 0 ? "Izquierda" : panel === 1 ? "Centro" : "Derecha"}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {Array.from({ length: PANEL_COUNT }, (_, i) => (
          <button
            key={i}
            onClick={() => setPanel(i)}
            aria-label={`Ir al panel ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
              i === panel ? "scale-125 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
