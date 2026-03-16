import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/atoms/card";
import { AuroraSpeech } from "@/components/molecules/aurora-speech";
import { StepIndicator } from "@/components/molecules/step-indicator";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { CompleteProfileForm } from "@/features/profile/components/complete-profile-form";
import { authOptions } from "@/lib/auth";

export default async function CompleteProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.profileCompleted) {
    redirect("/welcome");
  }

  return (
    <AppShellTemplate
      title="Completa tu perfil"
      subtitle="Solo necesitamos algunos datos para personalizar tu experiencia."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
        <Card className="space-y-6 p-6">
          <StepIndicator current={1} total={2} />
          <AuroraSpeech
            messages={[
              <>
                Soy Aurora. Antes de continuar, ayúdame con unos datos para adaptar mejor tu recorrido.
              </>,
              "Te tomará menos de un minuto.",
            ]}
          />
        </Card>

        <Card className="p-6">
          <CompleteProfileForm />
        </Card>
      </div>
    </AppShellTemplate>
  );
}
