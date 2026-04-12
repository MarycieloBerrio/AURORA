import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/organisms/logout-button";
import { WelcomeChatFlow } from "@/components/organisms/welcome-chat-flow";

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  if (!session.user.profileCompleted) redirect("/welcome/complete-profile");

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-white to-slate-50">

      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          {session.user.name ?? "Bienvenido"}
        </p>
        <LogoutButton />
      </header>

      {/* Hero — centered */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-12">

        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tight text-indigo-600 drop-shadow-sm">
            AURORA
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Tu guía vocacional personalizada
          </p>
        </div>

        <div className="w-full max-w-md">
          <WelcomeChatFlow />
        </div>

      </div>
    </main>
  );
}
