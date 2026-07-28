import { ReactNode } from "react";
import {
  APP_SHELL_CONTENT_WIDTH_CLASSES,
  APP_SHELL_CONTENT_WIDTHS,
  type AppShellContentWidth,
} from "@/constants/layout";

interface AppShellTemplateProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
  contentWidth?: AppShellContentWidth;
}

export function AppShellTemplate({
  title,
  subtitle,
  action,
  children,
  contentWidth = APP_SHELL_CONTENT_WIDTHS.standard,
}: AppShellTemplateProps) {
  return (
    <main className="min-h-screen min-w-0 p-6 md:p-10">
      <div
        className={`mx-auto w-full min-w-0 space-y-8 ${APP_SHELL_CONTENT_WIDTH_CLASSES[contentWidth]}`}
      >
        <header className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Aurora</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          </div>
          {action}
        </header>
        {children}
      </div>
    </main>
  );
}
