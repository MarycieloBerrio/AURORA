import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import {
  AURORA_CHAT_ERRORS,
  AURORA_CHAT_LIMITS,
  AURORA_CHAT_ROLE,
} from "@/features/aurora-chat/constants";
import { auroraChatRepository } from "@/features/aurora-chat/repository";
import { auroraGeminiService, AuroraChatServiceError } from "@/features/aurora-chat/gemini-service";
import { buildAuroraProfileContext } from "@/features/aurora-chat/profile-context";
import { getResultsProfile } from "@/features/results/lib/results-profile";

export const dynamic = "force-dynamic";

const messagePayloadSchema = z.object({
  message: z.string().trim().min(1).max(AURORA_CHAT_LIMITS.userMessageMaxLength),
});

async function getAuthorizedUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: NextResponse.json({ message: AURORA_CHAT_ERRORS.unauthorized }, { status: 401 }) };
  }
  if (!session.user.profileCompleted) {
    return { error: NextResponse.json({ message: AURORA_CHAT_ERRORS.profileIncomplete }, { status: 403 }) };
  }

  const profile = await getResultsProfile(session.user.id);
  if (!profile || profile.tier !== "complete") {
    return {
      error: NextResponse.json({ message: AURORA_CHAT_ERRORS.completeResultsRequired }, { status: 403 }),
    };
  }

  return { userId: session.user.id, profile };
}

function serviceErrorStatus(error: AuroraChatServiceError): number {
  if (error.code === "rateLimited") return 429;
  if (error.code === "missingGeminiConfig") return 500;
  if (error.code === "providerUnavailable") return 503;
  if (
    error.code === "providerRejectedRequest" ||
    error.code === "providerUnauthorized" ||
    error.code === "providerModelUnavailable"
  ) {
    return 502;
  }
  return 500;
}

function logRouteError(operation: string, error: unknown) {
  console.error("[aurora-chat] API operation failed", {
    operation,
    errorName: error instanceof Error ? error.name : "UnknownError",
    errorMessage: error instanceof Error ? error.message : String(error),
  });
}

export async function GET() {
  const authorized = await getAuthorizedUserId();
  if (authorized.error) return authorized.error;

  try {
    const session = await auroraChatRepository.getOrCreateActiveSession(authorized.userId);
    return NextResponse.json(session);
  } catch (error) {
    logRouteError("load-session", error);
    return NextResponse.json({ message: AURORA_CHAT_ERRORS.generic }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authorized = await getAuthorizedUserId();
  if (authorized.error) return authorized.error;

  const body = await request.json().catch(() => null);
  const parsed = messagePayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: AURORA_CHAT_ERRORS.invalidPayload }, { status: 400 });
  }

  try {
    const session = await auroraChatRepository.getOrCreateActiveSession(authorized.userId);
    await auroraChatRepository.addMessage(session.id, AURORA_CHAT_ROLE.user, parsed.data.message);

    const messages = await auroraChatRepository.getRecentMessages(session.id);
    const profileContext = buildAuroraProfileContext(authorized.profile);
    const replyContent = await auroraGeminiService.generateReply(messages, profileContext);
    const reply = await auroraChatRepository.addMessage(session.id, AURORA_CHAT_ROLE.model, replyContent);
    const updatedMessages = await auroraChatRepository.getRecentMessages(session.id);

    return NextResponse.json({ id: session.id, messages: updatedMessages, reply });
  } catch (error) {
    if (error instanceof AuroraChatServiceError) {
      if (error.code === "missingGeminiConfig") {
        logRouteError("send-message", error);
      }
      return NextResponse.json({ message: error.message }, { status: serviceErrorStatus(error) });
    }

    logRouteError("send-message", error);
    return NextResponse.json({ message: AURORA_CHAT_ERRORS.generic }, { status: 500 });
  }
}

export async function DELETE() {
  const authorized = await getAuthorizedUserId();
  if (authorized.error) return authorized.error;

  try {
    const session = await auroraChatRepository.resetSession(authorized.userId);
    return NextResponse.json(session);
  } catch (error) {
    logRouteError("reset-session", error);
    return NextResponse.json({ message: AURORA_CHAT_ERRORS.generic }, { status: 500 });
  }
}
