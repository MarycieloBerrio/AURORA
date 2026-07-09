import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { APP_ROUTES } from "@/constants/routes";
import { AuroraChatFloatingButton } from "@/features/aurora-chat/components/aurora-chat-floating-button";
import { CompleteResultsTour } from "@/features/aurora-chat/components/complete-results-tour";
import { getResultsProfile } from "@/features/results/lib/results-profile";
import { ResultsDashboard } from "@/features/results/components/results-dashboard";
import { ResultTierBadge } from "@/features/results/components/result-tier-badge";
import { ResultsTour } from "@/features/results/components/results-tour";
import { Button } from "@/components/atoms/button";
import { LogoutButton } from "@/components/organisms/logout-button";

export default async function ResultsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect(APP_ROUTES.login);
  if (!session.user.profileCompleted) redirect(APP_ROUTES.welcomeCompleteProfile);

  const profile = await getResultsProfile(session.user.id);
  if (!profile) redirect(APP_ROUTES.floor);

  const hasCompleteResults = profile.tier === "complete";

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
            <ResultTierBadge tier={profile.tier} />
            <Link href={APP_ROUTES.floor}>
              <Button variant="secondary" className="text-xs">Volver a la sala</Button>
            </Link>
            <LogoutButton />
          </div>
        </header>

        <ResultsDashboard
          careers={profile.careers}
          interests={profile.interests}
          personality={profile.personality}
          skills={profile.skills}
        />
      </div>

      <ResultsTour enabled={!hasCompleteResults} />
      <CompleteResultsTour enabled={hasCompleteResults} />
      <AuroraChatFloatingButton enabled={hasCompleteResults} />
    </main>
  );
}
