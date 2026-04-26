"use client";

import { Control, Controller, FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import { Select } from "@/components/atoms/select";
import { FormField } from "@/components/molecules/form-field";
import {
  educationalLevelOptions,
  educationalStatusOptions,
  genderOptions,
} from "@/features/profile/constants";

interface ProfileFieldValues extends FieldValues {
  gender?: unknown;
  birthdate: unknown;
  educationalLevel: string;
  educationalStatus: string;
}

interface ProfileFormFieldsProps<T extends ProfileFieldValues> {
  register: UseFormRegister<T>;
  control:  Control<T>;
  errors:   FieldErrors<T>;
  disabled?: boolean;
}

const fieldNames = {
  gender:            "gender",
  birthdate:         "birthdate",
  educationalLevel:  "educationalLevel",
  educationalStatus: "educationalStatus",
} as const;

export function ProfileFormFields<T extends ProfileFieldValues>({
  register,
  control,
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

      <FormField
        label="Nivel educativo"
        htmlFor="educationalLevel"
        error={errors.educationalLevel?.message?.toString()}
      >
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

        {/* Toggle cursando / completado */}
        <Controller
          control={control}
          name={fieldNames.educationalStatus as Path<T>}
          render={({ field }) => (
            <div
              className="mt-2 flex rounded-lg border border-slate-200 bg-slate-50 p-0.5"
              role="group"
              aria-label="Estado del nivel educativo"
            >
              {educationalStatusOptions.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  disabled={disabled}
                  onClick={() => field.onChange(value)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    field.value === value
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        />

        {errors.educationalStatus && (
          <p className="mt-1 text-xs text-rose-600">
            {errors.educationalStatus.message?.toString()}
          </p>
        )}
      </FormField>
    </>
  );
}
