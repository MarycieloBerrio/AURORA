"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/button";

const MESSAGES = [
  <>
    <span className="font-semibold text-indigo-700">Hola, soy Aurora</span>, te acompañaré en este
    emocionante recorrido. Te propongo un juego de rol: te acaban de contratar como practicante en
    una empresa tecnológica y debes realizar una serie de pruebas para determinar tu perfil.
  </>,
  <>
    Para ello, debes acceder a los{" "}
    <span className="font-semibold text-indigo-700">elementos interactivos</span> que encontrarás
    repartidos por la sede de la empresa. No debes hacer todas las pruebas, pero entre más hagas,
    más detallado será tu perfil.
  </>,
  <>
    Lo más importante es que las resuelvas con{" "}
    <span className="font-semibold text-indigo-700">total honestidad</span> y que no uses ayudas
    externas, ni personas ni dispositivos, a lo sumo papel y lápiz.
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
        <Link href="/app/floor">
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
