"use client";

interface ImageGridOptionProps {
  imageSrc: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  alt?: string;
}

export function ImageGridOption({ imageSrc, label, isSelected, onClick, alt }: ImageGridOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-square w-full rounded-xl border-2 transition ${
        isSelected
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span
        className={`absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          isSelected ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        {label}
      </span>
      <img
        src={imageSrc}
        alt={alt ?? `Opción ${label}`}
        className="h-full w-full object-contain p-2"
      />
    </button>
  );
}
