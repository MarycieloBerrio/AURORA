"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/atoms/button";

export function LogoutButton() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        void signOut({ callbackUrl: "/login" });
      }}
    >
      Cerrar sesión
    </Button>
  );
}
