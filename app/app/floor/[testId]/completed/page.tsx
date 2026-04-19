import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { AuroraSpeech } from "@/components/molecules/aurora-speech";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { findTestById } from "@/constants/floors";
import { authOptions } from "@/lib/auth";

interface CompletedPageProps {
  params: Promise<{ testId: string }>;
}

export default async function TestCompletedPage({ params }: CompletedPageProps) {
  const { testId } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.profileCompleted) redirect("/welcome/complete-profile");

  const found = findTestById(testId);
  if (!found) notFound();

  return (
    <AppShellTemplate
      title="Prueba completada"
      subtitle={found.test.labelEs}
    >
      <Card className="mx-auto max-w-2xl space-y-6 p-8">
        <AuroraSpeech
          avatarSize={72}
          messages={[
            <span key="congrats">
              Has completado <span className="font-semibold text-indigo-700">{found.test.labelEs}</span>.
              Tus respuestas se han guardado correctamente.
            </span>,
          ]}
        />
        <div className="flex justify-center">
          <Link href={found.floor.route}>
            <Button variant="secondary">Volver a la sala</Button>
          </Link>
        </div>
      </Card>
    </AppShellTemplate>
  );
}
