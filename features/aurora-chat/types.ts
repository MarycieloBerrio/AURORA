import type { AURORA_CHAT_ROLE } from "@/features/aurora-chat/constants";

export type AuroraChatRole = (typeof AURORA_CHAT_ROLE)[keyof typeof AURORA_CHAT_ROLE];

export interface AuroraChatMessageDto {
  id: string;
  role: AuroraChatRole;
  content: string;
  createdAt: string;
}

export interface AuroraChatSessionDto {
  id: string;
  messages: AuroraChatMessageDto[];
}

export interface AuroraChatResponseDto extends AuroraChatSessionDto {
  reply?: AuroraChatMessageDto;
}
