import { ReactNode } from "react";

type TailPosition = "left" | "bottom";

interface SpeechBubbleProps {
  children: ReactNode;
  tail?: TailPosition;
  className?: string;
}

export function SpeechBubble({ children, tail = "left", className = "" }: SpeechBubbleProps) {
  return (
    <div className={`relative rounded-2xl border border-indigo-100 bg-white px-4 py-3 shadow-md ${className}`}>
      {children}

      {tail === "left" && (
        <span className="absolute -left-2 top-4 h-4 w-4 rotate-45 border-b border-l border-indigo-100 bg-white" />
      )}

      {tail === "bottom" && (
        <span className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-b border-r border-indigo-100 bg-white" />
      )}
    </div>
  );
}
