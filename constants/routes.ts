export const APP_ROUTES = {
  admin: "/app/admin",
  floor: "/app/floor",
  login: "/login",
  results: "/app/results",
  welcomeCompleteProfile: "/welcome/complete-profile",
} as const;

export function getAdminUserResultsPath(userId: string): string {
  return `${APP_ROUTES.admin}/users/${userId}/results`;
}
