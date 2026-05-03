import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { Card } from "@/components/atoms/card";
import { AdminStatCards } from "./_components/admin-stat-cards";
import { AdminUserTable } from "./_components/admin-user-table";
import { AdminSniesButton } from "./_components/admin-snies-button";
import { AdminExportButton } from "./_components/admin-export-button";
import type { AdminUserRow } from "./_components/admin-user-table";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.isAdmin) redirect("/app/floor");

  const users = await prisma.user.findMany({
    select: {
      id:               true,
      email:            true,
      name:             true,
      gender:           true,
      birthdate:        true,
      educationalLevel: true,
      educationalStatus: true,
      isAdmin:          true,
      createdAt:        true,
      testRiasec1:      true,
      testRiasec2:      true,
      testRiasec3:      true,
      testRiasec4:      true,
      testHexaco1:      true,
      testHexaco2:      true,
      testHexaco3:      true,
      testReadingComprehension:  true,
      testDeductiveReasoning:    true,
      testInductiveReasoning:    true,
      testMathematicalReasoning: true,
      testSpatialReasoning:      true,
      testSelectiveAttention:    true,
    },
    orderBy: { createdAt: "desc" },
  });

  const userData: AdminUserRow[] = users.map((u) => {
    const riasecDone = [u.testRiasec1, u.testRiasec2, u.testRiasec3, u.testRiasec4].filter(Boolean).length;
    const hexacoDone = [u.testHexaco1, u.testHexaco2, u.testHexaco3].filter(Boolean).length;
    const skillDone  = [
      u.testReadingComprehension,
      u.testDeductiveReasoning,
      u.testInductiveReasoning,
      u.testMathematicalReasoning,
      u.testSpatialReasoning,
      u.testSelectiveAttention,
    ].filter(Boolean).length;

    return {
      id:               u.id,
      email:            u.email,
      name:             u.name,
      educationalLevel: u.educationalLevel,
      educationalStatus: u.educationalStatus,
      isAdmin:          u.isAdmin,
      createdAt:        u.createdAt.toISOString(),
      riasecDone,
      hexacoDone,
      skillDone,
      profileCompleted: Boolean(u.name && u.birthdate && u.educationalLevel),
      canViewResults:   riasecDone >= 1 && hexacoDone >= 1 && skillDone >= 1,
    };
  });

  const stats = {
    totalUsers:       userData.length,
    profileCompleted: userData.filter((u) => u.profileCompleted).length,
    canViewResults:   userData.filter((u) => u.canViewResults).length,
    allTestsDone:     userData.filter(
      (u) => u.riasecDone === 4 && u.hexacoDone === 3 && u.skillDone === 6
    ).length,
  };

  return (
    <AppShellTemplate
      title="Panel de administración"
      subtitle="Estado general de la plataforma AURORA"
      action={
        <Link
          href="/app/floor"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          Volver al piso
        </Link>
      }
    >
      <AdminStatCards stats={stats} totalUsers={stats.totalUsers} />
      <div className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Datos SNIES
          </p>
          <p className="text-sm text-slate-500">
            Programas de educación superior — MEN Colombia
          </p>
        </div>
        <AdminSniesButton />
      </div>

      <div className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Exportar perfiles
          </p>
          <p className="text-sm text-slate-500">
            Descarga todos los vectores de perfil (18 dimensiones) en Excel
          </p>
        </div>
        <AdminExportButton userId={session.user.id} userEmail={session.user.email ?? ""} />
      </div>
      <Card className="p-0 overflow-hidden">
        <AdminUserTable initialRows={userData} />
      </Card>
    </AppShellTemplate>
  );
}
