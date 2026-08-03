import Link from "next/link";
import { notFound } from "next/navigation";
import { APP_SHELL_CONTENT_WIDTHS } from "@/constants/layout";
import { APP_ROUTES } from "@/constants/routes";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { ADMIN_RESULTS_COPY } from "@/features/admin/constants";
import { requireAdminSession } from "@/features/admin/lib/admin-auth";
import { getResultsProfile } from "@/features/results/lib/results-profile";
import { ResultsDashboard } from "@/features/results/components/results-dashboard";
import { CAREER_AFFINITY_DISPLAY_MODES } from "@/features/results/constants/affinity-categories";
import { ResultTierBadge } from "@/features/results/components/result-tier-badge";
import { prisma } from "@/lib/prisma";

interface AdminUserResultsPageProps {
  params: Promise<{ userId: string }>;
}

export default async function AdminUserResultsPage({ params }: AdminUserResultsPageProps) {
  await requireAdminSession();

  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });

  if (!user) notFound();

  const profile = await getResultsProfile(userId);

  if (!profile) notFound();

  const displayName = user.name ?? user.email;

  return (
    <AppShellTemplate
      title={ADMIN_RESULTS_COPY.pageTitle}
      subtitle={`${displayName} - ${ADMIN_RESULTS_COPY.tierSubtitle}`}
      contentWidth={APP_SHELL_CONTENT_WIDTHS.wide}
      action={
        <div className="flex flex-wrap items-center gap-2">
          <ResultTierBadge tier={profile.tier} />
          <Link
            href={APP_ROUTES.admin}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            {ADMIN_RESULTS_COPY.backToAdmin}
          </Link>
        </div>
      }
    >
      <ResultsDashboard
        careers={profile.careers}
        interests={profile.interests}
        personality={profile.personality}
        skills={profile.skills}
        affinityDisplayMode={CAREER_AFFINITY_DISPLAY_MODES.exact}
      />
    </AppShellTemplate>
  );
}
