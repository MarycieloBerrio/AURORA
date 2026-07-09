import { prisma } from "@/lib/prisma";
import {
  AURORA_CHAT_COPY,
  AURORA_CHAT_LIMITS,
  AURORA_CHAT_ROLE,
  AURORA_CHAT_STATUS,
} from "@/features/aurora-chat/constants";
import type { AuroraChatMessageDto, AuroraChatRole, AuroraChatSessionDto } from "@/features/aurora-chat/types";

function toMessageDto(message: {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
}): AuroraChatMessageDto {
  return {
    id: message.id,
    role: message.role as AuroraChatRole,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
  };
}

export const auroraChatRepository = {
  async getOrCreateActiveSession(userId: string): Promise<AuroraChatSessionDto> {
    const existing = await prisma.auroraChatSession.findFirst({
      where: { userId, status: AURORA_CHAT_STATUS.active },
      orderBy: { updatedAt: "desc" },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (existing) {
      return {
        id: existing.id,
        messages: existing.messages.map(toMessageDto),
      };
    }

    const created = await prisma.auroraChatSession.create({
      data: {
        userId,
        status: AURORA_CHAT_STATUS.active,
        messages: {
          create: {
            role: AURORA_CHAT_ROLE.model,
            content: AURORA_CHAT_COPY.initialAssistantMessage,
          },
        },
      },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    return {
      id: created.id,
      messages: created.messages.map(toMessageDto),
    };
  },

  async addMessage(sessionId: string, role: AuroraChatRole, content: string): Promise<AuroraChatMessageDto> {
    const message = await prisma.auroraChatMessage.create({
      data: { sessionId, role, content },
    });

    await prisma.auroraChatSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() },
    });

    return toMessageDto(message);
  },

  async getRecentMessages(sessionId: string): Promise<AuroraChatMessageDto[]> {
    const messages = await prisma.auroraChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
      take: AURORA_CHAT_LIMITS.historyMaxMessages,
    });

    return messages.reverse().map(toMessageDto);
  },
};
