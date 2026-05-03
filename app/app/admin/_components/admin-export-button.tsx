"use client";

import { useState, useEffect, useRef } from "react";

type Status = "idle" | "loading" | "done" | "error";

interface ExportLogEntry {
  date: string;
  userId: string;
  userEmail: string;
}

const STORAGE_KEY  = "aurora:export-log";
const MAX_LOG_SIZE = 10;

function readLog(): ExportLogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as ExportLogEntry[];
  } catch {
    return [];
  }
}

function appendLog(entry: ExportLogEntry): ExportLogEntry[] {
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

interface AdminExportButtonProps {
  userId: string;
  userEmail: string;
}

export function AdminExportButton({ userId, userEmail }: AdminExportButtonProps) {
  const [status,   setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [log,      setLog]      = useState<ExportLogEntry[]>([]);
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

  async function handleDownload() {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/export");
      if (!res.ok) {
        const body = (await res.json()) as { message?: string };
        throw new Error(body.message ?? `HTTP ${res.status}`);
      }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);
      a.href     = url;
      a.download = `aurora-perfiles-${date}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);

      const newLog = appendLog({ date: new Date().toISOString(), userId, userEmail });
      setLog(newLog);
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3000);
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
        {status === "done" && (
          <span className="text-sm font-medium text-emerald-600">✓ Descargado</span>
        )}
        {status === "error" && (
          <span className="max-w-[220px] truncate text-xs font-medium text-rose-600" title={errorMsg ?? undefined}>
            ✗ {errorMsg ?? "Error al descargar"}
          </span>
        )}

        <button
          type="button"
          onClick={handleDownload}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generando…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              Descargar Excel
            </>
          )}
        </button>
      </div>

      {/* Log row */}
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
            ? <>Últ. descarga: {formatRelative(last.date)}</>
            : <>Sin descargas registradas</>
          }
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
            className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-20 mt-1.5 w-72 rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg">
            <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Historial de descargas
            </p>
            {log.length === 0 ? (
              <p className="px-3 py-2 text-xs text-slate-400">
                Aún no hay descargas registradas.
              </p>
            ) : (
              <ul>
                {log.map((entry, i) => (
                  <li key={entry.date} className="px-3 py-1.5 hover:bg-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs ${i === 0 ? "font-medium text-slate-700" : "text-slate-500"}`}>
                        {formatFull(entry.date)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-slate-400" title={entry.userId}>
                      {entry.userEmail}
                    </p>
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
