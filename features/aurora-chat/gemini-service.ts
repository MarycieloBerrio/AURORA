import {
  AURORA_CHAT_ERRORS,
  AURORA_CHAT_LIMITS,
  AURORA_CHAT_SYSTEM_INSTRUCTION,
  GEMINI_CONFIG,
} from "@/features/aurora-chat/constants";
import type { AuroraChatMessageDto } from "@/features/aurora-chat/types";

interface GeminiErrorBody {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

interface GeminiResponseBody {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

export class AuroraChatServiceError extends Error {
  constructor(public readonly code: keyof typeof AURORA_CHAT_ERRORS) {
    super(AURORA_CHAT_ERRORS[code]);
  }
}

function getGeminiConfig() {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL ?? GEMINI_CONFIG.defaultModel;

  if (!apiKey || !model) {
    throw new AuroraChatServiceError("missingGeminiConfig");
  }

  return { apiKey, model };
}

function buildEndpoint(model: string, apiKey: string): string {
  return `${GEMINI_CONFIG.endpointBase}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
}

function toGeminiContents(messages: AuroraChatMessageDto[]) {
  return messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.content }],
  }));
}

function extractReply(body: GeminiResponseBody): string | null {
  const parts = body.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((part) => part.text ?? "").join("\n").trim();
  return text.length > 0 ? text : null;
}

function isRateLimitResponse(status: number, body: GeminiErrorBody): boolean {
  return status === 429 || body.error?.status === GEMINI_CONFIG.resourceExhaustedCode;
}

export const auroraGeminiService = {
  async generateReply(messages: AuroraChatMessageDto[], profileContext: string): Promise<string> {
    const { apiKey, model } = getGeminiConfig();
    const response = await fetch(buildEndpoint(model, apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: `${AURORA_CHAT_SYSTEM_INSTRUCTION}\n\n${profileContext}` }],
        },
        contents: toGeminiContents(messages),
        generationConfig: {
          temperature: AURORA_CHAT_LIMITS.temperature,
          maxOutputTokens: AURORA_CHAT_LIMITS.maxOutputTokens,
        },
      }),
    });

    const body = (await response.json().catch(() => ({}))) as GeminiResponseBody & GeminiErrorBody;

    if (!response.ok) {
      if (isRateLimitResponse(response.status, body)) {
        throw new AuroraChatServiceError("rateLimited");
      }
      throw new AuroraChatServiceError("generic");
    }

    const reply = extractReply(body);
    if (!reply) {
      throw new AuroraChatServiceError("emptyGeminiResponse");
    }

    return reply;
  },
};
