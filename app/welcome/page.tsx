import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { AuroraSpeech } from "@/components/molecules/aurora-speech";
import { StepIndicator } from "@/components/molecules/step-indicator";
import { LogoutButton } from "@/components/organisms/logout-button";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { authOptions } from "@/lib/auth";

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }
  if (!session.user.profileCompleted) {
    redirect("/welcome/complete-profile");
  }

  return (
    <AppShellTemplate
      title="Inicio de recorrido"
      subtitle="Aurora te ayudará a explorar distintas áreas de una startup para descubrir más sobre tu perfil."
      action={<LogoutButton />}
    >
      <Card className="space-y-6 p-6 md:p-8">
        <StepIndicator current={1} total={2} />

        <AuroraSpeech
          avatarSize={80}
          messages={[
            <>
              <span className="font-semibold text-indigo-700">¡Hola!</span> Soy Aurora, tu asistente en este
              recorrido. Desde hoy eres un nuevo intern dentro de una startup tecnológica.
            </>,
            <>
              Visitarás distintos sectores, representados como <span className="font-medium">pisos</span>. En cada
              piso encontrarás elementos interactivos que nos ayudarán a conocer mejor tus preferencias.
            </>,
            "¡Comencemos con el primer sector para registrar tus primeras respuestas!",
          ]}
        />

        <div className="flex justify-center pt-2">
          <Link href="/app/floor/floor-1">
            <Button className="px-8 py-3 text-base">Comenzar recorrido</Button>
          </Link>
        </div>
      </Card>
    </AppShellTemplate>
  );
}
