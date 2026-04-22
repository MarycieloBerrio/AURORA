import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SpeechBubble } from "@/components/atoms/speech-bubble";
import { FloorCarousel } from "@/components/organisms/floor-carousel";
import { FloorMobileCarousel } from "@/components/organisms/floor-mobile-carousel";
import { FloorTestBubble } from "@/components/molecules/floor-test-bubble";
import { TestTypeProgress } from "@/components/molecules/test-type-progress";
import { HeaderMenu } from "@/components/organisms/header-menu";
import { authOptions } from "@/lib/auth";
import { FLOORS } from "@/constants/floors";
import { testService } from "@/services/test-service";
import { hasMinimumResults } from "@/features/results/lib/result-tier";

export default async function FloorPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.profileCompleted) redirect("/welcome/complete-profile");

  const floor = FLOORS[0];

  const [completionStatus, globalProgress] = await Promise.all([
    testService.getFloorCompletionStatus(session.user.id, floor.id),
    testService.getGlobalProgressByType(session.user.id),
  ]);

  const allCompleted = floor.tests.every((t) => completionStatus.get(t.id));
  const canViewResults = hasMinimumResults(
    globalProgress.riasec.done,
    globalProgress.hexaco.done,
    globalProgress.skill.done,
  );

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-2 shadow-sm md:px-6">
        {/* Left: avatar + title */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-indigo-200 bg-indigo-50">
            <Image src="/assets/aurora-guide.png" alt="Aurora" fill className="object-contain p-0.5" sizes="36px" />
          </div>
          <h1 className="truncate text-sm font-semibold text-slate-900">{floor.subtitleEs}</h1>
        </div>

        {/* Right: results button + hamburger menu */}
        <div className="flex shrink-0 items-center gap-2">
          {canViewResults && (
            <Link
              href="/app/results"
              className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              Ver resultados
            </Link>
          )}
          <HeaderMenu />
        </div>
      </header>

      <section className="relative min-h-0 flex-1">
        {/* ── Mobile: 3-panel swipe carousel (hidden on md+) ── */}
        <div className="absolute inset-0 z-10 md:hidden">
          <FloorMobileCarousel
            floor={floor}
            completionMap={Object.fromEntries(completionStatus)}
          />
        </div>

        {/* ── Desktop: full floor image (hidden on mobile) ── */}
        <div className="hidden h-full w-full md:block">
          <FloorCarousel />
        </div>

        {/* Desktop overlays: progress bars + test bubbles */}
        <div className="hidden md:contents">
          <TestTypeProgress progress={globalProgress} />
          {floor.tests.map((test) => (
            <FloorTestBubble
              key={test.id}
              test={test}
              completed={completionStatus.get(test.id) ?? false}
            />
          ))}
        </div>

        {/* Aurora guide (desktop only) */}
        <div className="pointer-events-none absolute bottom-0 left-2 z-10 hidden items-end gap-1 sm:left-3 md:left-4 md:flex">
          <div className="relative h-[180px] w-[90px] shrink-0 sm:h-[260px] sm:w-[130px] md:h-[380px] md:w-[190px] lg:h-[480px] lg:w-[240px]">
            <Image
              src="/assets/aurora-guide.png"
              alt="Aurora"
              fill
              className="object-contain drop-shadow-lg"
              sizes="(max-width: 640px) 90px, (max-width: 768px) 130px, (max-width: 1024px) 190px, 240px"
            />
          </div>
          <SpeechBubble tail="left" className="pointer-events-auto mb-8 max-w-[10rem] animate-fade-in sm:mb-12 sm:max-w-xs md:mb-20">
            {allCompleted ? (
              <p className="text-sm text-emerald-700">Has completado todas las pruebas de la sala.</p>
            ) : (
              <p className="text-sm text-slate-700">{floor.speechEs}</p>
            )}
          </SpeechBubble>
        </div>
      </section>
    </main>
  );
}
