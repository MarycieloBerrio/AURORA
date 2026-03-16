import Image from "next/image";
import { ReactNode } from "react";
import { SpeechBubble } from "@/components/atoms/speech-bubble";

type Layout = "horizontal" | "vertical";

interface AuroraSpeechProps {
  messages: ReactNode[];
  layout?: Layout;
  avatarSize?: number;
}

export function AuroraSpeech({ messages, layout = "horizontal", avatarSize = 64 }: AuroraSpeechProps) {
  if (layout === "vertical") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className="relative shrink-0 overflow-hidden rounded-full border-2 border-indigo-200 bg-indigo-50"
          style={{ width: avatarSize, height: avatarSize }}
        >
          <Image
            src="/assets/aurora-guide.png"
            alt="Aurora"
            fill
            className="object-contain p-1"
            sizes={`${avatarSize}px`}
          />
        </div>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <SpeechBubble key={index} tail={index === 0 ? "bottom" : undefined}>
              <div className="text-sm leading-relaxed text-slate-700">{message}</div>
            </SpeechBubble>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div
        className="relative shrink-0 overflow-hidden rounded-full border-2 border-indigo-200 bg-indigo-50"
        style={{ width: avatarSize, height: avatarSize }}
      >
        <Image
          src="/assets/aurora-guide.png"
          alt="Aurora"
          fill
          className="object-contain p-1"
          sizes={`${avatarSize}px`}
        />
      </div>
      <div className="flex-1 space-y-2">
        {messages.map((message, index) => (
          <SpeechBubble key={index} tail={index === 0 ? "left" : undefined}>
            <div className="text-sm leading-relaxed text-slate-700">{message}</div>
          </SpeechBubble>
        ))}
      </div>
    </div>
  );
}
