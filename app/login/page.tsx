import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { authOptions } from "@/lib/auth";
import { AuthTemplate } from "@/components/templates/auth-template";
import { InfoChip } from "@/components/atoms/info-chip";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    redirect(session.user.profileCompleted ? "/welcome" : "/welcome/complete-profile");
  }

  return (
    <AuthTemplate
      title={
        <>
          Bienvenido a{" "}
          <InfoChip
            label="Aurora"
            info="Nombre de la diosa romana que personifica el amanecer y venerada como guía de los navegantes (estrella de la mañana)"
          />
        </>
      }
      subtitle={
        <>
          Tu guía vocacional en{" "}
          <InfoChip
            label="STEM"
            info="Science + Technology + Engineering + Math (Ciencias naturales + Tecnologías + Ingeniería + Matemáticas)"
          />
        </>
      }
    >
      <LoginForm />
    </AuthTemplate>
  );
}
