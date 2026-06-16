import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/constants/routes";
import { authOptions } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) redirect(APP_ROUTES.login);
  if (!session.user.isAdmin) redirect(APP_ROUTES.floor);

  return session;
}
