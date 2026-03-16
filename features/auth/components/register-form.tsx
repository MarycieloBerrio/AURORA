"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormField } from "@/components/molecules/form-field";
import { ProfileFormFields } from "@/features/profile/components/profile-form-fields";
import { registerSchema, type RegisterFormInput } from "@/features/profile/schemas";

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: RegisterFormInput) => {
    setServerError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { message?: string };
    if (!response.ok) {
      setServerError(payload.message ?? "No pudimos crear tu cuenta. Inténtalo de nuevo.");
      return;
    }

    const loginResult = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/auth/post-login",
    });

    if (!loginResult || loginResult.error) {
      setServerError("Tu cuenta fue creada, pero no pudimos iniciar sesión automáticamente.");
      return;
    }

    router.push("/auth/post-login");
    router.refresh();
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
          placeholder="Crea una contraseña segura"
          autoComplete="new-password"
          {...register("password")}
        />
      </FormField>

      <FormField label="Nombre" htmlFor="name" error={errors.name?.message}>
        <Input id="name" type="text" placeholder="Tu nombre" autoComplete="name" {...register("name")} />
      </FormField>

      <ProfileFormFields register={register} errors={errors} disabled={isSubmitting} />

      {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
