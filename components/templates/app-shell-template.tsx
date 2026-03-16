import { ReactNode } from "react";

interface AppShellTemplateProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}

export function AppShellTemplate({ title, subtitle, action, children }: AppShellTemplateProps) {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
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
