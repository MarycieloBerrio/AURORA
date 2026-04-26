"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/atoms/badge";

export interface AdminUserRow {
  id: string;
  email: string;
  name: string | null;
  educationalLevel: string | null;
  educationalStatus: string | null;
  isAdmin: boolean;
  createdAt: string;
  riasecDone: number;
  hexacoDone: number;
  skillDone: number;
  profileCompleted: boolean;
  canViewResults: boolean;
}

interface AdminUserTableProps {
  initialRows: AdminUserRow[];
}

const LEVEL_LABELS: Record<string, string> = {
  SECONDARY:     "Secundaria",
  TECHNICAL:     "Técnico",
  TECHNOLOGICAL: "Tecnológico",
  UNIVERSITY:    "Universitario",
  OTHER:         "Otro",
};

function MiniBar({ done, total, color }: { done: number; total: number; color: string }) {
  const width = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-1.5">
      <span className="tabular-nums text-xs text-slate-600">
        {done}/{total}
      </span>
      <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function AdminUserTable({ initialRows }: AdminUserTableProps) {
  const [search, setSearch] = useState("");
  const [profileFilter, setProfileFilter] = useState<"all" | "complete" | "pending">("all");
  const [resultsFilter, setResultsFilter] = useState<"all" | "can" | "cannot">("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return initialRows.filter((row) => {
      if (q) {
        const matchName  = row.name?.toLowerCase().includes(q) ?? false;
        const matchEmail = row.email.toLowerCase().includes(q);
        if (!matchName && !matchEmail) return false;
      }
      if (profileFilter === "complete" && !row.profileCompleted) return false;
      if (profileFilter === "pending"  &&  row.profileCompleted) return false;
      if (resultsFilter === "can"    && !row.canViewResults) return false;
      if (resultsFilter === "cannot" &&  row.canViewResults) return false;
      return true;
    });
  }, [initialRows, search, profileFilter, resultsFilter]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="relative flex-1 min-w-48">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <select
          value={profileFilter}
          onChange={(e) => setProfileFilter(e.target.value as "all" | "complete" | "pending")}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        >
          <option value="all">Todos los perfiles</option>
          <option value="complete">Perfil completo</option>
          <option value="pending">Perfil pendiente</option>
        </select>

        <select
          value={resultsFilter}
          onChange={(e) => setResultsFilter(e.target.value as "all" | "can" | "cannot")}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        >
          <option value="all">Todos los accesos</option>
          <option value="can">Puede ver resultados</option>
          <option value="cannot">Sin acceso a resultados</option>
        </select>

        <span className="ml-auto shrink-0 text-xs text-slate-400">
          Mostrando {filtered.length} de {initialRows.length} usuarios
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3">Usuario</th>
              <th className="px-5 py-3">Perfil</th>
              <th className="px-5 py-3">Nivel</th>
              <th className="px-5 py-3">RIASEC</th>
              <th className="px-5 py-3">HEXACO</th>
              <th className="px-5 py-3">Skills</th>
              <th className="px-5 py-3">Resultados</th>
              <th className="px-5 py-3">Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-400">
                  No se encontraron usuarios con los filtros aplicados.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Usuario */}
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-800">{row.name ?? <span className="italic text-slate-400">Sin nombre</span>}</p>
                    <p className="text-xs text-slate-400">{row.email}</p>
                    {row.isAdmin && (
                      <Badge variant="indigo" className="mt-0.5">Admin</Badge>
                    )}
                  </td>

                  {/* Perfil */}
                  <td className="px-5 py-3">
                    {row.profileCompleted
                      ? <Badge variant="emerald">Completo</Badge>
                      : <Badge variant="amber">Pendiente</Badge>}
                  </td>

                  {/* Nivel educativo */}
                  <td className="px-5 py-3 text-slate-600">
                    {row.educationalLevel ? (LEVEL_LABELS[row.educationalLevel] ?? row.educationalLevel) : "—"}
                  </td>

                  {/* RIASEC */}
                  <td className="px-5 py-3">
                    <MiniBar done={row.riasecDone} total={4} color="bg-indigo-400" />
                  </td>

                  {/* HEXACO */}
                  <td className="px-5 py-3">
                    <MiniBar done={row.hexacoDone} total={3} color="bg-violet-400" />
                  </td>

                  {/* Skills */}
                  <td className="px-5 py-3">
                    <MiniBar done={row.skillDone} total={6} color="bg-sky-400" />
                  </td>

                  {/* Resultados */}
                  <td className="px-5 py-3">
                    {row.canViewResults
                      ? <Badge variant="indigo">Puede ver</Badge>
                      : <Badge variant="slate">No puede</Badge>}
                  </td>

                  {/* Registro */}
                  <td className="px-5 py-3 text-xs text-slate-500 whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleDateString("es-CO")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
