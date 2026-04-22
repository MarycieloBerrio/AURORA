"use client";

import { useState, useRef, useEffect } from "react";
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
}

export function HeaderMenu({ extraItems = [] }: HeaderMenuProps) {
  const [open, setOpen] = useState(false);
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

  const allItems: MenuItemConfig[] = [
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
