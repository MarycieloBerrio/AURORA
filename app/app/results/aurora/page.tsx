import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { APP_ROUTES } from "@/constants/routes";
import { AURORA_CHAT_COPY } from "@/features/aurora-chat/constants";
import { AuroraChatInterface } from "@/features/aurora-chat/components/aurora-chat-interface";
import { getResultsProfile } from "@/features/results/lib/results-profile";
import { authOptions } from "@/lib/auth";

export default async function AuroraResultsChatPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect(APP_ROUTES.login);
  if (!session.user.profileCompleted) redirect(APP_ROUTES.welcomeCompleteProfile);

  const profile = await getResultsProfile(session.user.id);
  if (!profile) redirect(APP_ROUTES.floor);
  if (profile.tier !== "complete") redirect(APP_ROUTES.results);

  return (
    <main className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Aurora</p>
            <h1 className="text-xl font-bold text-slate-900">{AURORA_CHAT_COPY.pageTitle}</h1>
            <p className="text-xs text-slate-500">{AURORA_CHAT_COPY.pageSubtitle}</p>
          </div>
          <Link href={APP_ROUTES.results}>
            <Button variant="secondary" className="text-xs">
              {AURORA_CHAT_COPY.backToResults}
            </Button>
          </Link>
        </header>

        <AuroraChatInterface />
      </div>
    </main>
  );
}
