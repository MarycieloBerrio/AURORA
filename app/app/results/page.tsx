import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { testService } from "@/services/test-service";
import { computeResultTier } from "@/features/results/lib/result-tier";
import { RiasecPanel } from "@/features/results/components/riasec-panel";
import { HexacoPanel } from "@/features/results/components/hexaco-panel";
import { AptitudePanel } from "@/features/results/components/aptitude-panel";
import { CareersPanel } from "@/features/results/components/careers-panel";
import { ResultTierBadge } from "@/features/results/components/result-tier-badge";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { LogoutButton } from "@/components/organisms/logout-button";

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

  if (!tier) redirect("/app/floor/floor-1");

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
            <Link href="/app/floor/floor-1">
              <Button variant="secondary" className="text-xs">Volver a los pisos</Button>
            </Link>
            <LogoutButton />
          </div>
        </header>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-5 lg:w-1/2">
            <Card className="p-5">
              <RiasecPanel interests={interests} />
            </Card>
            <Card className="p-5">
              <HexacoPanel personality={personality} />
            </Card>
            <Card className="p-5">
              <AptitudePanel skills={skills} />
            </Card>
          </div>

          <div className="lg:w-1/2">
            <Card className="sticky top-6 max-h-[calc(100vh-5rem)] overflow-y-auto p-5">
              <CareersPanel tier={tier} />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
