"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { ProfileFormFields } from "@/features/profile/components/profile-form-fields";
import {
  completeProfileClientSchema,
  type CompleteProfileClientFormInput,
} from "@/features/profile/schemas";

export function CompleteProfileForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileClientFormInput>({
    resolver: zodResolver(completeProfileClientSchema),
    mode: "onSubmit",
    defaultValues: {
      gender:            "",
      educationalStatus: "ONGOING",
      dataConsent:       false,
    },
  });

  const onSubmit = async (values: CompleteProfileClientFormInput) => {
    setServerError("");

    // Omit dataConsent — it's only a client-side gate, not stored in the DB
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dataConsent: _consent, ...profileData } = values;

    const response = await fetch("/api/profile/complete", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(profileData),
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
      <ProfileFormFields
        register={register}
        control={control}
        errors={errors}
        disabled={isSubmitting}
      />

      {/* Consentimiento tratamiento de datos */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            id="dataConsent"
            {...register("dataConsent")}
            disabled={isSubmitting}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-amber-500"
          />
          <span className="text-sm leading-snug text-slate-600">
            He leído y acepto la{" "}
            <a
              href="/politica-de-tratamiento-de-datos"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-600 underline underline-offset-2 hover:text-amber-700"
              onClick={(e) => e.stopPropagation()}
            >
              Política de Tratamiento de Datos Personales
            </a>{" "}
            de AURORA.
          </span>
        </label>
        {errors.dataConsent && (
          <p className="mt-2 text-xs text-rose-600">
            {errors.dataConsent.message?.toString()}
          </p>
        )}
      </div>

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
