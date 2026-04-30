"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

export function AdminSniesButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState<number | null>(null);

  async function handleRefresh() {
    setStatus("loading");
    setCount(null);

    try {
      const res = await fetch("/api/admin/snies/refresh", { method: "POST" });
      if (res.ok) {
        const data = (await res.json()) as { inserted: number };
        setCount(data.inserted);
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleRefresh}
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Actualizando SNIES…
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                clipRule="evenodd"
              />
            </svg>
            Actualizar SNIES
          </>
        )}
      </button>

      {status === "done" && count !== null && (
        <span className="text-sm font-medium text-emerald-600">
          ✓ {count.toLocaleString("es-CO")} programas cargados
        </span>
      )}
      {status === "error" && (
        <span className="text-sm font-medium text-rose-600">
          Error al actualizar. Intenta de nuevo.
        </span>
      )}
    </div>
  );
}
