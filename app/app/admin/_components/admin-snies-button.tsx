"use client";

import { useState, useEffect, useRef } from "react";

type Status = "idle" | "loading" | "done" | "error";

interface SniesLogEntry {
  date: string;   // ISO string
  count: number;
}

const STORAGE_KEY  = "aurora:snies-log";
const MAX_LOG_SIZE = 10;

function readLog(): SniesLogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as SniesLogEntry[];
  } catch {
    return [];
  }
}

function appendLog(entry: SniesLogEntry): SniesLogEntry[] {
  const log = [entry, ...readLog()].slice(0, MAX_LOG_SIZE);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  return log;
}

function formatRelative(iso: string): string {
  const diff  = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  <  1) return "hace un momento";
  if (mins  < 60) return `hace ${mins} min`;
  if (hours < 24) return `hace ${hours} h`;
  if (days  <  2) return "ayer";
  if (days  <  7) return `hace ${days} días`;
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function formatFull(iso: string): string {
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function AdminSniesButton() {
  const [status,   setStatus]   = useState<Status>("idle");
  const [count,    setCount]    = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [log,      setLog]      = useState<SniesLogEntry[]>([]);
  const [open,     setOpen]     = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setLog(readLog()); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  async function handleRefresh() {
    setStatus("loading");
    setCount(null);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/snies/refresh", { method: "POST" });
      let body: { inserted?: number; message?: string } = {};
      try { body = (await res.json()) as typeof body; } catch { /* non-json */ }

      if (res.ok && body.inserted !== undefined) {
        const newLog = appendLog({ date: new Date().toISOString(), count: body.inserted });
        setLog(newLog);
        setCount(body.inserted);
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

  const last = log[0] ?? null;

  return (
    <div className="flex flex-col items-end gap-1">

      {/* Button row */}
      <div className="flex items-center gap-3">
        {status === "done" && count !== null && (
          <span className="text-sm font-medium text-emerald-600">
            ✓ {count.toLocaleString("es-CO")} programas
          </span>
        )}
        {status === "error" && (
          <span className="max-w-[220px] truncate text-xs font-medium text-rose-600" title={errorMsg ?? undefined}>
            ✗ {errorMsg ?? "Error al actualizar"}
          </span>
        )}

        <button
          type="button"
          onClick={handleRefresh}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Actualizando…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
              </svg>
              Actualizar SNIES
            </>
          )}
        </button>
      </div>

      {/* Log row — always visible */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 text-[11px] text-slate-400 transition hover:text-slate-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 shrink-0">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5V3.75Z" clipRule="evenodd" />
          </svg>
          {last
            ? <>Últ. actualización: {formatRelative(last.date)}</>
            : <>Sin actualizaciones registradas</>
          }
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
            className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-20 mt-1.5 w-64 rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg">
            <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Historial
            </p>
            {log.length === 0 ? (
              <p className="px-3 py-2 text-xs text-slate-400">
                Aún no hay actualizaciones registradas.
              </p>
            ) : (
              <ul>
                {log.map((entry, i) => (
                  <li key={entry.date} className="flex items-center justify-between gap-4 px-3 py-1.5 hover:bg-slate-50">
                    <span className={`text-xs ${i === 0 ? "font-medium text-slate-700" : "text-slate-500"}`}>
                      {formatFull(entry.date)}
                    </span>
                    <span className="shrink-0 text-[11px] text-slate-400">
                      {entry.count.toLocaleString("es-CO")} prog.
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
