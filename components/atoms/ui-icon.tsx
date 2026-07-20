import type { SVGProps } from "react";

export const UI_ICON_NAMES = {
  arrowUpDown: "arrow-up-down",
  clear: "clear",
  emptySearch: "empty-search",
  graduationCap: "graduation-cap",
  search: "search",
  sort: "sort",
  sparkles: "sparkles",
} as const;

export type UiIconName = (typeof UI_ICON_NAMES)[keyof typeof UI_ICON_NAMES];

const ICON_PATHS: Record<UiIconName, string> = {
  [UI_ICON_NAMES.arrowUpDown]: "M6.22 3.22a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1-1.06 1.06L7.5 5.56V14a.75.75 0 0 1-1.5 0V5.56l-.72.72a.75.75 0 0 1-1.06-1.06l2-2Zm7.56 10.5a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06-1.06l.72-.72H11a.75.75 0 0 1 0-1.5h.44l-.72-.72a.75.75 0 1 1 1.06-1.06l2 2Z",
  [UI_ICON_NAMES.clear]: "M6.5 3.25A1.25 1.25 0 0 1 7.75 2h4.5a1.25 1.25 0 0 1 1.25 1.25V4h2a.75.75 0 0 1 0 1.5h-.54l-.62 10.02A1.6 1.6 0 0 1 12.74 17H7.26a1.6 1.6 0 0 1-1.6-1.48L5.04 5.5H4.5a.75.75 0 0 1 0-1.5h2v-.75ZM8 4h4v-.5H8V4Zm-.84 1.5.6 10h4.48l.6-10H7.16Z",
  [UI_ICON_NAMES.emptySearch]: "M8.75 3a5.75 5.75 0 1 0 3.59 10.24l3.71 3.71a.75.75 0 1 0 1.06-1.06l-3.71-3.71A5.75 5.75 0 0 0 8.75 3Zm-4.25 5.75a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0Zm2.25-.75a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5h-4Z",
  [UI_ICON_NAMES.graduationCap]: "M10.32 2.12a.75.75 0 0 0-.64 0l-7 3.25a.75.75 0 0 0 0 1.36L4 7.34v4.41C4 13.55 6.69 15 10 15s6-1.45 6-3.25V7.34l1.25-.58v4.99a.75.75 0 0 0 1.5 0V5.87a.75.75 0 0 0-.43-.68l-8-3.07ZM5.5 8.04 9.68 10a.75.75 0 0 0 .64 0l4.18-1.96v3.71c0 .42-1.56 1.75-4.5 1.75s-4.5-1.33-4.5-1.75V8.04ZM10 8.49 4.78 6.05 10 3.63l5.22 2.42L10 8.49Z",
  [UI_ICON_NAMES.search]: "M8.75 3a5.75 5.75 0 1 0 3.59 10.24l3.71 3.71a.75.75 0 1 0 1.06-1.06l-3.71-3.71A5.75 5.75 0 0 0 8.75 3Zm-4.25 5.75a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0Z",
  [UI_ICON_NAMES.sort]: "M4 4.75A.75.75 0 0 1 4.75 4h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 4.75Zm2 5A.75.75 0 0 1 6.75 9h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 9.75Zm2 5A.75.75 0 0 1 8.75 14h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 8 14.75Z",
  [UI_ICON_NAMES.sparkles]: "M10 2.5a.75.75 0 0 1 .72.54l.49 1.66a5.5 5.5 0 0 0 3.72 3.72l1.66.49a.75.75 0 0 1 0 1.44l-1.66.49a5.5 5.5 0 0 0-3.72 3.72l-.49 1.66a.75.75 0 0 1-1.44 0l-.49-1.66a5.5 5.5 0 0 0-3.72-3.72l-1.66-.49a.75.75 0 0 1 0-1.44l1.66-.49A5.5 5.5 0 0 0 8.79 4.7l.49-1.66A.75.75 0 0 1 10 2.5Zm0 3.04A7.02 7.02 0 0 1 5.91 9.63 7.02 7.02 0 0 1 10 13.72a7.02 7.02 0 0 1 4.09-4.09A7.02 7.02 0 0 1 10 5.54Z",
};

interface UiIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: UiIconName;
}

export function UiIcon({ name, className = "h-4 w-4", ...props }: UiIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
