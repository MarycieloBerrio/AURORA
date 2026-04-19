import { FloorSlide } from "@/components/molecules/floor-slide";
import { FLOORS } from "@/constants/floors";

export function FloorCarousel() {
  return (
    <div className="relative h-full w-full bg-slate-900" role="region" aria-label="Vista de la sala">
      <div className="h-full w-full">
        <FloorSlide floor={FLOORS[0]} />
      </div>
    </div>
  );
}
