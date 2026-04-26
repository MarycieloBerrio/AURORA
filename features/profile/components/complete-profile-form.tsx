"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { ProfileFormFields } from "@/features/profile/components/profile-form-fields";
import {
  completeProfileSchema,
  type CompleteProfileFormInput,
} from "@/features/profile/schemas";

export function CompleteProfileForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileFormInput>({
    resolver: zodResolver(completeProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      gender:            "",
      educationalStatus: "ONGOING",
    },
  });

  const onSubmit = async (values: CompleteProfileFormInput) => {
    setServerError("");

    const response = await fetch("/api/profile/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { message?: string };
    if (!response.ok) {
      setServerError(payload.message ?? "No pudimos guardar tu perfil.");
      return;
    }

    router.push("/welcome");
    router.refresh();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <ProfileFormFields register={register} control={control} errors={errors} disabled={isSubmitting} />

      {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar y continuar"}
      </Button>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="w-full text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
