export const APP_SHELL_CONTENT_WIDTHS = {
  standard: "standard",
  wide: "wide",
} as const;

export type AppShellContentWidth =
  (typeof APP_SHELL_CONTENT_WIDTHS)[keyof typeof APP_SHELL_CONTENT_WIDTHS];

export const APP_SHELL_CONTENT_WIDTH_CLASSES: Record<AppShellContentWidth, string> = {
  [APP_SHELL_CONTENT_WIDTHS.standard]: "max-w-6xl",
  [APP_SHELL_CONTENT_WIDTHS.wide]: "max-w-[1536px]",
};
