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
    this.name = "AuroraChatServiceError";
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

function buildEndpoint(model: string): string {
  return `${GEMINI_CONFIG.endpointBase}/${encodeURIComponent(model)}:generateContent`;
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

function getProviderErrorCode(status: number): keyof typeof AURORA_CHAT_ERRORS {
  if (status === 400) return "providerRejectedRequest";
  if (status === 401 || status === 403) return "providerUnauthorized";
  if (status === 404) return "providerModelUnavailable";
  if (status >= 500) return "providerUnavailable";
  return "generic";
}

function logProviderError(status: number, body: GeminiErrorBody, model: string) {
  console.error("[aurora-chat] Gemini request failed", {
    status,
    providerCode: body.error?.code,
    providerStatus: body.error?.status,
    providerMessage: body.error?.message,
    model,
  });
}

export const auroraGeminiService = {
  async generateReply(messages: AuroraChatMessageDto[], profileContext: string): Promise<string> {
    const { apiKey, model } = getGeminiConfig();
    let response: Response;

    try {
      response = await fetch(buildEndpoint(model), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [GEMINI_CONFIG.apiKeyHeader]: apiKey,
        },
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
    } catch (error) {
      console.error("[aurora-chat] Gemini connection failed", {
        error: error instanceof Error ? error.message : String(error),
        model,
      });
      throw new AuroraChatServiceError("providerUnavailable");
    }

    const body = (await response.json().catch(() => ({}))) as GeminiResponseBody & GeminiErrorBody;

    if (!response.ok) {
      logProviderError(response.status, body, model);
      if (isRateLimitResponse(response.status, body)) {
        throw new AuroraChatServiceError("rateLimited");
      }
      throw new AuroraChatServiceError(getProviderErrorCode(response.status));
    }

    const reply = extractReply(body);
    if (!reply) {
      throw new AuroraChatServiceError("emptyGeminiResponse");
    }

    return reply;
  },
};
