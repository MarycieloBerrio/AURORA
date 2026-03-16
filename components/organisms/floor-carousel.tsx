"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@/components/atoms/icon-button";
import { FloorIndicators } from "@/components/molecules/floor-indicators";
import { FloorSlide } from "@/components/molecules/floor-slide";
import { FLOORS, FLOOR_STORAGE_KEY } from "@/constants/floors";
import { getFloorIndex } from "@/lib/floor-helpers";

interface FloorCarouselProps {
  currentFloorId: string;
}

const SWIPE_THRESHOLD = 50;

export function FloorCarousel({ currentFloorId }: FloorCarouselProps) {
  const router = useRouter();
  const touchStartX = useRef(0);
  const currentIndex = getFloorIndex(currentFloorId);

  const navigateToFloor = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(FLOORS.length - 1, index));
      if (clamped === currentIndex) return;
      const target = FLOORS[clamped];
      localStorage.setItem(FLOOR_STORAGE_KEY, target.id);
      router.push(target.route);
    },
    [currentIndex, router],
  );

  useEffect(() => {
    localStorage.setItem(FLOOR_STORAGE_KEY, currentFloorId);
  }, [currentFloorId]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") navigateToFloor(currentIndex - 1);
      if (e.key === "ArrowRight") navigateToFloor(currentIndex + 1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, navigateToFloor]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      navigateToFloor(currentIndex + (delta > 0 ? 1 : -1));
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < FLOORS.length - 1;

  return (
    <div
      className="relative h-full w-full bg-slate-900"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrusel de pisos"
      aria-roledescription="carrusel"
    >
      <div className="h-full w-full animate-slide-in" key={currentFloorId}>
        <FloorSlide
          floor={FLOORS[currentIndex]}
          totalFloors={FLOORS.length}
          currentIndex={currentIndex}
        />
      </div>

      <div className="absolute left-3 top-1/2 z-20 -translate-y-1/2">
        <IconButton label="Piso anterior" onClick={() => navigateToFloor(currentIndex - 1)} disabled={!hasPrev}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2">
        <IconButton label="Siguiente piso" onClick={() => navigateToFloor(currentIndex + 1)} disabled={!hasNext}>
          <ChevronRightIcon />
        </IconButton>
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
        <FloorIndicators floors={FLOORS} activeIndex={currentIndex} onSelect={navigateToFloor} />
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
