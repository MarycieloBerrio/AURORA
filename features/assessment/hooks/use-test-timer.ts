"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseTestTimerOptions {
  startedAt: string;
  timeLimitSeconds: number;
  onTimeUp: () => void;
}

interface UseTestTimerReturn {
  remainingSeconds: number;
  progress: number;
  isExpired: boolean;
  formattedTime: string;
}

export function useTestTimer({
  startedAt,
  timeLimitSeconds,
  onTimeUp,
}: UseTestTimerOptions): UseTestTimerReturn {
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const startMs = new Date(startedAt).getTime();
  const endMs = startMs + timeLimitSeconds * 1000;

  const calcRemaining = useCallback(() => {
    return Math.max(0, Math.ceil((endMs - Date.now()) / 1000));
  }, [endMs]);

  const [remainingSeconds, setRemainingSeconds] = useState(calcRemaining);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const remaining = calcRemaining();
      setRemainingSeconds(remaining);

      if (remaining <= 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        onTimeUpRef.current();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [calcRemaining]);

  const progress = timeLimitSeconds > 0 ? remainingSeconds / timeLimitSeconds : 0;
  const isExpired = remainingSeconds <= 0;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return { remainingSeconds, progress, isExpired, formattedTime };
}
