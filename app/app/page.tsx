import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FloorRedirect } from "@/components/organisms/floor-redirect";
import { authOptions } from "@/lib/auth";

export default async function AppPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.profileCompleted) redirect("/welcome/complete-profile");

  return <FloorRedirect />;
}
