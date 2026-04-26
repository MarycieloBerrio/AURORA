"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export interface MenuItemConfig {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  destructive?: boolean;
}

interface HeaderMenuProps {
  /** Extra items to show above the logout entry. Pass more items here as features grow. */
  extraItems?: MenuItemConfig[];
  isAdmin?: boolean;
}

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
    <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7a11.58 11.58 0 0 1 .104-1.589.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
  </svg>
);

export function HeaderMenu({ extraItems = [], isAdmin = false }: HeaderMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const adminItems: MenuItemConfig[] = isAdmin
    ? [
        {
          label: "Panel de administración",
          icon: <ShieldCheckIcon />,
          onClick: () => {
            setOpen(false);
            router.push("/app/admin");
          },
        },
      ]
    : [];

  const allItems: MenuItemConfig[] = [
    ...adminItems,
    ...extraItems,
    {
      label: "Cerrar sesión",
      destructive: true,
      onClick: () => {
        setOpen(false);
        void signOut({ callbackUrl: "/login" });
      },
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menú"
        aria-expanded={open}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
      >
        <span
          className={`block h-0.5 w-5 rounded-full bg-slate-600 transition-all duration-200 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 rounded-full bg-slate-600 transition-all duration-200 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 rounded-full bg-slate-600 transition-all duration-200 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl ring-1 ring-black/5 animate-fade-in">
          <ul role="menu" className="py-1">
            {allItems.map((item, idx) => (
              <li key={idx} role="none">
                {/* Divider before destructive items when there are items above */}
                {item.destructive && idx > 0 && (
                  <div className="my-1 border-t border-slate-100" />
                )}
                <button
                  role="menuitem"
                  onClick={item.onClick}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50 ${
                    item.destructive ? "text-rose-600 hover:bg-rose-50" : "text-slate-700"
                  }`}
                >
                  {item.icon && (
                    <span className="h-4 w-4 shrink-0">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
