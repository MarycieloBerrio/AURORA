"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/atoms/button";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogle = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/auth/post-login" });
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleGoogle}
        disabled={isLoading}
      >
        {isLoading ? "Redirigiendo..." : "Continuar con Google"}
      </Button>
    </div>
  );
}
