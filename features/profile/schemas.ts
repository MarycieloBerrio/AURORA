import { z } from "zod";
import { educationalLevelValues } from "@/features/profile/constants";

const genderSchema = z
  .union([z.string().trim().min(1), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value));

const birthdateSchema = z.coerce
  .date({ message: "Ingresa una fecha válida." })
  .max(new Date(), "La fecha debe ser en el pasado.")
  .refine((date) => {
    const ageDiff = new Date().getFullYear() - date.getFullYear();
    return ageDiff >= 10 && ageDiff <= 99;
  }, "Ingresa una fecha de nacimiento válida (entre 10 y 99 años).");

const educationalLevelSchema = z.enum(educationalLevelValues, {
  message: "Selecciona tu nivel educativo.",
});

export const completeProfileSchema = z.object({
  gender: genderSchema,
  birthdate: birthdateSchema,
  educationalLevel: educationalLevelSchema,
});

export const registerSchema = z.object({
  email: z.string().trim().email("Ingresa un correo válido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(72, "La contraseña es demasiado larga."),
  name: z.string().trim().min(1, "Ingresa tu nombre.").max(128),
  ...completeProfileSchema.shape,
});

export type RegisterInput = z.output<typeof registerSchema>;
export type RegisterFormInput = z.input<typeof registerSchema>;
export type CompleteProfileInput = z.output<typeof completeProfileSchema>;
export type CompleteProfileFormInput = z.input<typeof completeProfileSchema>;
