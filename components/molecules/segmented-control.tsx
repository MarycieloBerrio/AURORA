import { UiIcon, type UiIconName } from "@/components/atoms/ui-icon";

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  ariaLabel: string;
  icon: UiIconName;
  options: readonly SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  ariaLabel,
  icon,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex shrink-0 items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5"
    >
      <UiIcon name={icon} className="mx-1 h-3.5 w-3.5 shrink-0 text-slate-400" />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
            value === option.value
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
