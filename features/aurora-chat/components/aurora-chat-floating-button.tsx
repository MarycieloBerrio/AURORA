import Image from "next/image";
import Link from "next/link";
import { AURORA_CHAT_COPY, AURORA_CHAT_ROUTES } from "@/features/aurora-chat/constants";

interface AuroraChatFloatingButtonProps {
  enabled: boolean;
}

export function AuroraChatFloatingButton({ enabled }: AuroraChatFloatingButtonProps) {
  if (!enabled) return null;

  return (
    <Link
      href={AURORA_CHAT_ROUTES.page}
      aria-label={AURORA_CHAT_COPY.floatingButtonLabel}
      className="fixed bottom-5 right-5 z-40 flex h-20 w-20 items-center justify-center rounded-full border border-indigo-200 bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 md:h-24 md:w-24"
    >
      <span className="relative h-16 w-12 md:h-20 md:w-14">
        <Image
          src="/assets/aurora-guide.png"
          alt="Aurora"
          fill
          className="object-contain p-1"
          sizes="(max-width: 768px) 48px, 56px"
        />
      </span>
    </Link>
  );
}
