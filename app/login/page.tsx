import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { authOptions } from "@/lib/auth";
import { AuthTemplate } from "@/components/templates/auth-template";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    redirect(session.user.profileCompleted ? "/welcome" : "/welcome/complete-profile");
  }

  return (
    <AuthTemplate
      title="Bienvenido a Aurora"
      subtitle="Tu recorrido vocacional comienza aquí, como nuevo intern en una startup tecnológica."
    >
      <LoginForm />
    </AuthTemplate>
  );
}
