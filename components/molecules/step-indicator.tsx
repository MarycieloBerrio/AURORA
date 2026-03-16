interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-600">
        Paso {current} de {total}
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
