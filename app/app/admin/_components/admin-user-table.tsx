"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/atoms/badge";
import {
  ADMIN_FILTER_OPTIONS,
  ADMIN_PROFILE_FILTERS,
  ADMIN_RESULTS_FILTERS,
  ADMIN_TEST_TOTALS,
  ADMIN_USER_TABLE_COPY,
  type AdminProfileFilter,
  type AdminResultsFilter,
} from "@/features/admin/constants";

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
  resultsPath: string | null;
}

interface AdminUserTableProps {
  initialRows: AdminUserRow[];
}

type RowPredicate = (row: AdminUserRow) => boolean;

const LEVEL_LABELS: Record<string, string> = {
  SECONDARY: "Secundaria",
  TECHNICAL: "Técnico",
  TECHNOLOGICAL: "Tecnológico",
  UNIVERSITY: "Universitario",
  OTHER: "Otro",
};

const PROFILE_FILTER_PREDICATES: Record<AdminProfileFilter, RowPredicate> = {
  [ADMIN_PROFILE_FILTERS.all]: () => true,
  [ADMIN_PROFILE_FILTERS.complete]: (row) => row.profileCompleted,
  [ADMIN_PROFILE_FILTERS.pending]: (row) => !row.profileCompleted,
};

const RESULTS_FILTER_PREDICATES: Record<AdminResultsFilter, RowPredicate> = {
  [ADMIN_RESULTS_FILTERS.all]: () => true,
  [ADMIN_RESULTS_FILTERS.canView]: (row) => row.canViewResults,
  [ADMIN_RESULTS_FILTERS.cannotView]: (row) => !row.canViewResults,
};

const RESULT_ACTION_CLASSES =
  "inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100";
const RESULT_UNAVAILABLE_CLASSES =
  "inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-400";

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

function matchesSearch(row: AdminUserRow, query: string): boolean {
  const searchableText = [row.name, row.email].filter(Boolean).join(" ").toLowerCase();

  return !query || searchableText.includes(query);
}

function ResultProfileAction({ resultsPath }: Pick<AdminUserRow, "resultsPath">) {
  return resultsPath ? (
    <Link href={resultsPath} className={RESULT_ACTION_CLASSES}>
      {ADMIN_USER_TABLE_COPY.resultAction}
    </Link>
  ) : (
    <span className={RESULT_UNAVAILABLE_CLASSES}>
      {ADMIN_USER_TABLE_COPY.resultUnavailable}
    </span>
  );
}

export function AdminUserTable({ initialRows }: AdminUserTableProps) {
  const [search, setSearch] = useState("");
  const [profileFilter, setProfileFilter] = useState<AdminProfileFilter>(ADMIN_PROFILE_FILTERS.all);
  const [resultsFilter, setResultsFilter] = useState<AdminResultsFilter>(ADMIN_RESULTS_FILTERS.all);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return initialRows.filter((row) =>
      matchesSearch(row, query) &&
      PROFILE_FILTER_PREDICATES[profileFilter](row) &&
      RESULTS_FILTER_PREDICATES[resultsFilter](row)
    );
  }, [initialRows, search, profileFilter, resultsFilter]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="relative flex-1 min-w-48">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          <input
            type="text"
            placeholder={ADMIN_USER_TABLE_COPY.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <select
          value={profileFilter}
          onChange={(event) => setProfileFilter(event.target.value as AdminProfileFilter)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        >
          {ADMIN_FILTER_OPTIONS.profiles.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={resultsFilter}
          onChange={(event) => setResultsFilter(event.target.value as AdminResultsFilter)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
        >
          {ADMIN_FILTER_OPTIONS.results.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="ml-auto shrink-0 text-xs text-slate-400">
          {ADMIN_USER_TABLE_COPY.showingPrefix} {filtered.length} {ADMIN_USER_TABLE_COPY.showingMiddle}{" "}
          {initialRows.length} {ADMIN_USER_TABLE_COPY.showingSuffix}
        </span>
      </div>

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
              <th className="px-5 py-3">{ADMIN_USER_TABLE_COPY.detailHeader}</th>
              <th className="px-5 py-3">Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-5 py-12 text-center text-sm text-slate-400">
                  {ADMIN_USER_TABLE_COPY.emptyState}
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-800">
                      {row.name ?? <span className="italic text-slate-400">{ADMIN_USER_TABLE_COPY.unnamedUser}</span>}
                    </p>
                    <p className="text-xs text-slate-400">{row.email}</p>
                    {row.isAdmin && (
                      <Badge variant="indigo" className="mt-0.5">
                        {ADMIN_USER_TABLE_COPY.adminBadge}
                      </Badge>
                    )}
                  </td>

                  <td className="px-5 py-3">
                    {row.profileCompleted ? (
                      <Badge variant="emerald">{ADMIN_USER_TABLE_COPY.profileComplete}</Badge>
                    ) : (
                      <Badge variant="amber">{ADMIN_USER_TABLE_COPY.profilePending}</Badge>
                    )}
                  </td>

                  <td className="px-5 py-3 text-slate-600">
                    {row.educationalLevel ? (LEVEL_LABELS[row.educationalLevel] ?? row.educationalLevel) : "—"}
                  </td>

                  <td className="px-5 py-3">
                    <MiniBar done={row.riasecDone} total={ADMIN_TEST_TOTALS.riasec} color="bg-indigo-400" />
                  </td>

                  <td className="px-5 py-3">
                    <MiniBar done={row.hexacoDone} total={ADMIN_TEST_TOTALS.hexaco} color="bg-violet-400" />
                  </td>

                  <td className="px-5 py-3">
                    <MiniBar done={row.skillDone} total={ADMIN_TEST_TOTALS.skill} color="bg-sky-400" />
                  </td>

                  <td className="px-5 py-3">
                    {row.canViewResults ? (
                      <Badge variant="indigo">{ADMIN_USER_TABLE_COPY.resultAllowed}</Badge>
                    ) : (
                      <Badge variant="slate">{ADMIN_USER_TABLE_COPY.resultDenied}</Badge>
                    )}
                  </td>

                  <td className="px-5 py-3">
                    <ResultProfileAction resultsPath={row.resultsPath} />
                  </td>

                  <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-500">
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
