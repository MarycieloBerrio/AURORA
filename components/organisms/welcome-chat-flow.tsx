"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/button";

const MESSAGES = [
  <>
    <span className="font-semibold text-indigo-700">¡Hola!</span> Soy Aurora, tu asistente en este
    recorrido. Desde hoy eres un nuevo intern dentro de una startup tecnológica.
  </>,
  <>
    Visitarás distintos sectores, representados como{" "}
    <span className="font-semibold text-indigo-700">pisos</span>. En cada piso encontrarás elementos
    interactivos que nos ayudarán a conocer mejor tus preferencias.
  </>,
  <>
    ¡Comencemos con el primer sector para{" "}
    <span className="font-semibold text-indigo-700">registrar tus primeras respuestas</span>!
  </>,
] as const;

export function WelcomeChatFlow() {
  const [index, setIndex] = useState(0);
  const isLast = index === MESSAGES.length - 1;

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Aurora avatar */}
      <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-indigo-200 bg-indigo-50 shadow-xl ring-4 ring-indigo-100">
        <Image
          src="/assets/aurora-guide.png"
          alt="Aurora"
          fill
          className="object-contain p-2"
          sizes="144px"
          priority
        />
      </div>

      {/* Single chat bubble — key forces remount → CSS animation replays */}
      <div
        key={index}
        className="relative w-full max-w-md animate-[fadeSlideUp_0.3s_ease-out] rounded-2xl border border-indigo-100 bg-white px-5 py-4 shadow-lg"
      >
        {/* Tail pointing up toward avatar */}
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 border-l border-t border-indigo-100 bg-white" />
        <p className="text-center text-sm leading-relaxed text-slate-700">{MESSAGES[index]}</p>
      </div>

      {/* Dot progress */}
      <div className="flex gap-2">
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-indigo-600" : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Action */}
      {isLast ? (
        <Link href="/app/floor/floor-1">
          <Button className="px-10 py-3 text-base">Comenzar recorrido</Button>
        </Link>
      ) : (
        <Button onClick={() => setIndex((i) => i + 1)} className="px-10 py-3 text-base">
          Siguiente
        </Button>
      )}
    </div>
  );
}
