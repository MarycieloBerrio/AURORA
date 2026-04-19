import Image from "next/image";
import { FloorConfig } from "@/constants/floors";

interface FloorSlideProps {
  floor: FloorConfig;
}

export function FloorSlide({ floor }: FloorSlideProps) {
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
    </div>
  );
}
