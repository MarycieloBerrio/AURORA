import Image from "next/image";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { SpeechBubble } from "@/components/atoms/speech-bubble";
import { FloorCarousel } from "@/components/organisms/floor-carousel";
import { FloorTestBubble } from "@/components/molecules/floor-test-bubble";
import { TestTypeProgress } from "@/components/molecules/test-type-progress";
import { LogoutButton } from "@/components/organisms/logout-button";
import { authOptions } from "@/lib/auth";
import { getFloorById } from "@/lib/floor-helpers";
import { testService } from "@/services/test-service";

interface FloorPageProps {
  params: Promise<{ floorId: string }>;
}

export default async function FloorPage({ params }: FloorPageProps) {
  const { floorId } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.profileCompleted) redirect("/welcome/complete-profile");

  const floor = getFloorById(floorId);
  if (!floor) notFound();

  const [completionStatus, globalProgress] = await Promise.all([
    testService.getFloorCompletionStatus(session.user.id, floorId),
    testService.getGlobalProgressByType(session.user.id),
  ]);
  const allCompleted = floor.tests.every((t) => completionStatus.get(t.id));

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-2 shadow-sm md:px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-indigo-200 bg-indigo-50">
            <Image src="/assets/aurora-guide.png" alt="Aurora" fill className="object-contain p-0.5" sizes="40px" />
          </div>
          <h1 className="text-sm font-semibold text-slate-900">
            {floor.nameEs} · {floor.subtitleEs}
          </h1>
        </div>
        <LogoutButton />
      </header>

      <section className="relative min-h-0 flex-1">
        <FloorCarousel currentFloorId={floorId} />

        <TestTypeProgress progress={globalProgress} />

        {floor.tests.map((test) => (
          <FloorTestBubble
            key={test.id}
            test={test}
            floorId={floorId}
            completed={completionStatus.get(test.id) ?? false}
          />
        ))}

        <div className="pointer-events-none absolute bottom-0 left-2 z-10 flex items-end gap-1 sm:left-3 md:left-4">
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
              <p className="text-sm text-emerald-700">Has completado todas las pruebas de este piso.</p>
            ) : (
              <p className="text-sm text-slate-700">{floor.speechEs}</p>
            )}
          </SpeechBubble>
        </div>
      </section>
    </main>
  );
}
