import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthTemplate } from "@/components/templates/auth-template";
import { RegisterForm } from "@/features/auth/components/register-form";
import { authOptions } from "@/lib/auth";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    redirect(session.user.profileCompleted ? "/welcome" : "/welcome/complete-profile");
  }

  return (
    <AuthTemplate
      title="Crea tu cuenta en Aurora"
      subtitle="Comienza tu recorrido vocacional en minutos."
    >
      <RegisterForm />
    </AuthTemplate>
  );
}
