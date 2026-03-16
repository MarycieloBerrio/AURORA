import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(15,23,42,0.05)] ${className}`}
      {...props}
    />
  );
}
