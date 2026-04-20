import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurora",
  description: "Guía vocacional gamificada para estudiantes",
  icons: {
    icon: { url: "/assets/favicon.png", sizes: "32x32", type: "image/png" },
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
