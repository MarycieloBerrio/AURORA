import Link from "next/link";
import { APP_ROUTES } from "@/constants/routes";
import { Card } from "@/components/atoms/card";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { ADMIN_RESULTS_COPY, ADMIN_RESULTS_ERRORS } from "@/features/admin/constants";

export default function AdminUserResultsNotFound() {
  return (
    <AppShellTemplate
      title={ADMIN_RESULTS_COPY.notFoundTitle}
      subtitle={ADMIN_RESULTS_COPY.notFoundSubtitle}
      action={
        <Link
          href={APP_ROUTES.admin}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          {ADMIN_RESULTS_COPY.backToAdmin}
        </Link>
      }
    >
      <Card className="p-6" data-error-code={ADMIN_RESULTS_ERRORS.unavailable}>
        <p className="text-sm text-slate-600">{ADMIN_RESULTS_COPY.notFoundSubtitle}</p>
      </Card>
    </AppShellTemplate>
  );
}
