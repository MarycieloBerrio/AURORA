"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

interface BackfillResult { email: string; dimensions: number }

export function AdminBackfillButton() {
  const [status,   setStatus]   = useState<Status>("idle");
  const [results,  setResults]  = useState<BackfillResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleBackfill() {
    setStatus("loading");
    setResults([]);
    setErrorMsg(null);
    try {
      const res  = await fetch("/api/admin/backfill-profiles", { method: "POST" });
      const body = (await res.json()) as { updated?: number; results?: BackfillResult[]; message?: string };
      if (res.ok && body.results) {
        setResults(body.results);
        setStatus("done");
      } else {
        setErrorMsg(body.message ?? `HTTP ${res.status}`);
        setStatus("error");
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error de red");
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        {status === "done" && (
          <span className="text-sm font-medium text-emerald-600">
            ✓ {results.length} usuarios actualizados
          </span>
        )}
        {status === "error" && (
          <span className="max-w-[220px] truncate text-xs font-medium text-rose-600" title={errorMsg ?? undefined}>
            ✗ {errorMsg ?? "Error"}
          </span>
        )}

        <button
          type="button"
          onClick={handleBackfill}
          disabled={status === "loading" || status === "done"}
          className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Calculando…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
              </svg>
              Calcular perfiles históricos
            </>
          )}
        </button>
      </div>

      {status === "done" && results.length > 0 && (
        <ul className="max-h-32 w-72 overflow-y-auto rounded-lg border border-slate-100 bg-white py-1 text-[11px] shadow-sm">
          {results.map((r) => (
            <li key={r.email} className="flex justify-between gap-4 px-3 py-1 hover:bg-slate-50">
              <span className="truncate text-slate-600">{r.email}</span>
              <span className="shrink-0 font-medium text-slate-400">{r.dimensions}/18 dim.</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
