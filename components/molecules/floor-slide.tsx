import Image from "next/image";
import { FloorConfig } from "@/constants/floors";

interface FloorSlideProps {
  floor: FloorConfig;
  totalFloors: number;
  currentIndex: number;
}

export function FloorSlide({ floor, totalFloors, currentIndex }: FloorSlideProps) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={floor.imageSrc}
        alt={`Ilustración de ${floor.nameEs} — ${floor.subtitleEs}`}
        fill
        className="object-contain"
        sizes="100vw"
        priority
      />

      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {floor.nameEs}
        </span>
        <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] tabular-nums text-white/80 backdrop-blur-sm">
          {currentIndex + 1} / {totalFloors}
        </span>
      </div>

    </div>
  );
}
