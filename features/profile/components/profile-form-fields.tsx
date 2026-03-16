"use client";

import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import { Select } from "@/components/atoms/select";
import { FormField } from "@/components/molecules/form-field";
import {
  educationalLevelOptions,
  genderOptions,
} from "@/features/profile/constants";

interface ProfileFieldValues extends FieldValues {
  gender?: unknown;
  birthdate: unknown;
  educationalLevel: string;
}

interface ProfileFormFieldsProps<T extends ProfileFieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
}

const fieldNames = {
  gender: "gender",
  birthdate: "birthdate",
  educationalLevel: "educationalLevel",
} as const;

export function ProfileFormFields<T extends ProfileFieldValues>({
  register,
  errors,
  disabled = false,
}: ProfileFormFieldsProps<T>) {
  return (
    <>
      <FormField label="Género (opcional)" htmlFor="gender" error={errors.gender?.message?.toString()}>
        <Select id="gender" defaultValue="" disabled={disabled} {...register(fieldNames.gender as Path<T>)}>
          <option value="">Selecciona una opción</option>
          {genderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Fecha de nacimiento" htmlFor="birthdate" error={errors.birthdate?.message?.toString()}>
        <Input
          id="birthdate"
          type="date"
          disabled={disabled}
          {...register(fieldNames.birthdate as Path<T>)}
        />
      </FormField>

      <FormField label="Nivel educativo" htmlFor="educationalLevel" error={errors.educationalLevel?.message?.toString()}>
        <Select
          id="educationalLevel"
          defaultValue=""
          disabled={disabled}
          {...register(fieldNames.educationalLevel as Path<T>)}
        >
          <option value="">Selecciona una opción</option>
          {educationalLevelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>
    </>
  );
}
