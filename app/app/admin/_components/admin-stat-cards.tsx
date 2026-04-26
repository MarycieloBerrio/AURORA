import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";

interface Stats {
  totalUsers: number;
  profileCompleted: number;
  canViewResults: number;
  allTestsDone: number;
}

interface AdminStatCardsProps {
  stats: Stats;
  totalUsers: number;
}

function pct(numerator: number, denominator: number): string {
  if (denominator === 0) return "0%";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

export function AdminStatCards({ stats, totalUsers }: AdminStatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {/* Total usuarios */}
      <Card className="p-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total usuarios</p>
        <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
        <p className="text-sm text-slate-500">Cuentas registradas</p>
      </Card>

      {/* Perfiles completos */}
      <Card className="p-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Perfiles completos</p>
        <p className="text-3xl font-bold text-indigo-600">{stats.profileCompleted}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-500">Completaron su perfil</p>
          <Badge variant="emerald">{pct(stats.profileCompleted, totalUsers)}</Badge>
        </div>
      </Card>

      {/* Pueden ver resultados */}
      <Card className="p-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ver resultados</p>
        <p className="text-3xl font-bold text-indigo-600">{stats.canViewResults}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-500">Acceso a resultados</p>
          <Badge variant="indigo">{pct(stats.canViewResults, totalUsers)}</Badge>
        </div>
      </Card>

      {/* Tests al 100% */}
      <Card className="p-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tests al 100%</p>
        <p className="text-3xl font-bold text-indigo-600">{stats.allTestsDone}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-500">Completaron todo</p>
          <Badge variant="amber">{pct(stats.allTestsDone, totalUsers)}</Badge>
        </div>
      </Card>
    </div>
  );
}
