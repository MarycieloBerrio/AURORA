export const educationalLevelValues = [
  "SECONDARY",
  "TECHNICAL",
  "TECHNOLOGICAL",
  "UNIVERSITY",
  "OTHER",
] as const;

export type EducationalLevelValue = (typeof educationalLevelValues)[number];

export const educationalLevelOptions: Array<{ value: EducationalLevelValue; label: string }> = [
  { value: "SECONDARY", label: "Secundaria" },
  { value: "TECHNICAL", label: "Técnico" },
  { value: "TECHNOLOGICAL", label: "Tecnológico" },
  { value: "UNIVERSITY", label: "Universitario" },
  { value: "OTHER", label: "Otro" },
];

export const genderOptions: Array<{ value: string; label: string }> = [
  { value: "FEMALE", label: "Femenino" },
  { value: "MALE", label: "Masculino" },
  { value: "NON_BINARY", label: "No binario" },
  { value: "PREFER_NOT_TO_SAY", label: "Prefiero no decirlo" },
];
