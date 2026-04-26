import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { Card } from "@/components/atoms/card";
import { AdminStatCards } from "./_components/admin-stat-cards";
import { AdminUserTable } from "./_components/admin-user-table";
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
    >
      <AdminStatCards stats={stats} totalUsers={stats.totalUsers} />
      <Card className="p-0 overflow-hidden">
        <AdminUserTable initialRows={userData} />
      </Card>
    </AppShellTemplate>
  );
}
