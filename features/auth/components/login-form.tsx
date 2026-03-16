"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormField } from "@/components/molecules/form-field";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError("");
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/auth/post-login",
    });

    if (!result || result.error) {
      setServerError("No pudimos iniciar sesión. Revisa tus credenciales.");
      return;
    }

    router.push("/auth/post-login");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    setServerError("");
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl: "/auth/post-login" });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Correo electrónico" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" placeholder="tu-correo@ejemplo.com" autoComplete="email" {...register("email")} />
      </FormField>

      <FormField label="Contraseña" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          placeholder="Tu contraseña"
          autoComplete="current-password"
          {...register("password")}
        />
      </FormField>

      {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </Button>

      <Button type="button" variant="secondary" className="w-full" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
        {isGoogleLoading ? "Redirigiendo..." : "Continuar con Google"}
      </Button>

      <p className="text-center text-sm text-slate-600">
        ¿Aún no tienes cuenta?{" "}
        <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Crear cuenta
        </Link>
      </p>

      <p className="text-center text-xs text-slate-500">
        Usuario demo: demo@aurora.app
        <br />
        Contraseña: Demo12345!
      </p>
    </form>
  );
}
