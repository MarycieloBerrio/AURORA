import { Card } from "@/components/atoms/card";

export function AuroraGuidePlaceholder() {
  return (
    <Card className="flex h-56 items-center justify-center bg-gradient-to-br from-indigo-50 to-sky-50 p-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Guía Aurora</p>
        <p className="mt-3 text-sm text-slate-600">
          Aquí irá la imagen oficial de Aurora.
          <br />
          Reemplaza este placeholder en <span className="font-semibold">public/assets/aurora-guide.png</span>.
        </p>
      </div>
    </Card>
  );
}
