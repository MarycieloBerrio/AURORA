import { ReactNode } from "react";

interface AuthTemplateProps {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
}

export function AuthTemplate({ title, subtitle, children }: AuthTemplateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <header className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </header>
        {children}
      </section>
    </main>
  );
}
