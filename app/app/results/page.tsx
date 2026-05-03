import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { testService } from "@/services/test-service";
import { computeResultTier } from "@/features/results/lib/result-tier";
import { rankCareers } from "@/features/results/lib/affinity";
import { ResultsDashboard } from "@/features/results/components/results-dashboard";
import { ResultTierBadge } from "@/features/results/components/result-tier-badge";
import { Button } from "@/components/atoms/button";
import { LogoutButton } from "@/components/organisms/logout-button";
import { ResultsTour } from "@/features/results/components/results-tour";

export default async function ResultsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.profileCompleted) redirect("/welcome/complete-profile");

  const [interests, personality, skills, progress] = await Promise.all([
    testService.computeInterests(session.user.id),
    testService.computePersonality(session.user.id),
    testService.computeSkills(session.user.id),
    testService.getGlobalProgressByType(session.user.id),
  ]);

  const tier = computeResultTier(
    progress.riasec.done,
    progress.hexaco.done,
    progress.skill.done,
  );

  if (!tier) redirect("/app/floor");

  const careers = rankCareers(interests, personality, skills);

  return (
    <main className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Aurora</p>
            <h1 className="text-xl font-bold text-slate-900">Tus resultados</h1>
            <p className="text-xs text-slate-500">
              {session.user.name ?? "Estudiante"} — basado en tus pruebas completadas
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ResultTierBadge tier={tier} />
            <Link href="/app/floor">
              <Button variant="secondary" className="text-xs">Volver a la sala</Button>
            </Link>
            <LogoutButton />
          </div>
        </header>

        <ResultsDashboard
          careers={careers}
          interests={interests}
          personality={personality}
          skills={skills}
        />
      </div>

      <ResultsTour />
    </main>
  );
}
