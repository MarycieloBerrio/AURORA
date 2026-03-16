import Image from "next/image";
import Link from "next/link";

interface FloorIllustrationPlaceholderProps {
  questionnairePath: string;
  disabled?: boolean;
}

export function FloorIllustrationPlaceholder({ questionnairePath, disabled }: FloorIllustrationPlaceholderProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-slate-900">
      <Image
        src="/assets/floor-1-room.png"
        alt="Ilustración del sector del Piso 1"
        fill
        className="object-contain"
        sizes="100vw"
        priority
        unoptimized
      />

      {disabled ? (
        <div
          className="absolute z-10 flex flex-col items-center gap-3"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-white/70 bg-emerald-600 text-4xl font-bold text-white shadow-2xl shadow-emerald-600/50 ring-4 ring-emerald-400/30 md:h-[88px] md:w-[88px] md:text-5xl">
            ✓
          </span>
          <span className="rounded-full bg-black/70 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
            Diagnóstico completado
          </span>
        </div>
      ) : (
        <Link
          href={questionnairePath}
          className="group absolute z-10 flex flex-col items-center gap-3"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-white/70 bg-indigo-600 text-4xl font-bold text-white shadow-2xl shadow-indigo-600/50 ring-4 ring-indigo-400/30 transition-all group-hover:scale-110 group-hover:bg-indigo-500 md:h-[88px] md:w-[88px] md:text-5xl">
            ?
          </span>
          <span className="rounded-full bg-black/70 px-4 py-1.5 text-sm font-medium text-white shadow-lg transition-all group-hover:bg-indigo-600">
            Iniciar diagnóstico
          </span>
        </Link>
      )}
    </div>
  );
}
