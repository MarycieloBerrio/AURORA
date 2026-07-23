"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { MarkdownContent } from "@/components/atoms/markdown-content";
import {
  AURORA_CHAT_COPY,
  AURORA_CHAT_ERRORS,
  AURORA_CHAT_ROLE,
  AURORA_CHAT_ROUTES,
} from "@/features/aurora-chat/constants";
import type { AuroraChatMessageDto } from "@/features/aurora-chat/types";

interface ApiErrorResponse {
  message?: string;
}

export function AuroraChatInterface() {
  const [messages, setMessages] = useState<AuroraChatMessageDto[]>([]);
  const [input, setInput] = useState("");
  const [loadingSession, setLoadingSession] = useState(true);
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const loadSession = useCallback(async (clearError = true) => {
    setLoadingSession(true);
    if (clearError) setError(null);

    try {
      const response = await fetch(AURORA_CHAT_ROUTES.api, { method: "GET" });
      const body = (await response.json().catch(() => ({}))) as { messages?: AuroraChatMessageDto[] } & ApiErrorResponse;

      if (!response.ok) {
        setError(body.message ?? AURORA_CHAT_ERRORS.generic);
        return;
      }

      setMessages(body.messages ?? []);
    } catch {
      setError(AURORA_CHAT_ERRORS.generic);
    } finally {
      setLoadingSession(false);
    }
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();
    if (!message || sending || resetting) return;

    setSending(true);
    setError(null);
    setInput("");

    try {
      const response = await fetch(AURORA_CHAT_ROUTES.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const body = (await response.json().catch(() => ({}))) as { messages?: AuroraChatMessageDto[] } & ApiErrorResponse;

      if (!response.ok) {
        await loadSession(false);
        setError(body.message ?? AURORA_CHAT_ERRORS.generic);
        return;
      }

      setMessages(body.messages ?? []);
    } catch {
      await loadSession(false);
      setError(AURORA_CHAT_ERRORS.generic);
    } finally {
      setSending(false);
    }
  }

  async function handleReset() {
    if (sending || resetting || !window.confirm(AURORA_CHAT_COPY.confirmReset)) return;

    setResetting(true);
    setError(null);

    try {
      const response = await fetch(AURORA_CHAT_ROUTES.api, { method: "DELETE" });
      const body = (await response.json().catch(() => ({}))) as { messages?: AuroraChatMessageDto[] } & ApiErrorResponse;

      if (!response.ok) {
        setError(body.message ?? AURORA_CHAT_ERRORS.generic);
        return;
      }

      setMessages(body.messages ?? []);
      setInput("");
    } catch {
      setError(AURORA_CHAT_ERRORS.generic);
    } finally {
      setResetting(false);
    }
  }

  if (loadingSession) {
    return (
      <Card className="flex min-h-[420px] items-center justify-center p-6">
        <p className="text-sm text-slate-500">{AURORA_CHAT_COPY.loadingSession}</p>
      </Card>
    );
  }

  return (
    <Card className="flex h-[calc(100vh-13rem)] min-h-[520px] flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 rounded-full border border-indigo-100 bg-indigo-50">
            <Image src="/assets/aurora-guide.png" alt="Aurora" fill className="object-contain p-1" sizes="48px" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">Aurora</p>
            <p className="truncate text-xs text-slate-500">Orientación vocacional complementaria</p>
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          disabled={sending || resetting}
          className="shrink-0"
        >
          {resetting ? AURORA_CHAT_COPY.resettingChat : AURORA_CHAT_COPY.newChat}
        </Button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 px-4 py-5 md:px-6">
        {messages.length === 0 && <p className="text-sm text-slate-500">{AURORA_CHAT_COPY.emptyState}</p>}

        {messages.map((message) => {
          const isUser = message.role === AURORA_CHAT_ROLE.user;
          return (
            <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm md:max-w-[72%] ${
                  isUser
                    ? "whitespace-pre-wrap rounded-br-sm bg-indigo-600 text-white"
                    : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                }`}
              >
                {isUser ? message.content : <MarkdownContent content={message.content} />}
              </div>
            </div>
          );
        })}

        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              {AURORA_CHAT_COPY.loadingReply}
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {error && (
        <div className="border-t border-amber-100 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3 border-t border-slate-100 bg-white p-4">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={AURORA_CHAT_COPY.inputPlaceholder}
          rows={2}
          disabled={sending || resetting}
          className="min-h-12 flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-50"
        />
        <Button type="submit" disabled={sending || resetting || input.trim().length === 0} className="self-end">
          {AURORA_CHAT_COPY.send}
        </Button>
      </form>
    </Card>
  );
}
