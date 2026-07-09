-- CreateTable
CREATE TABLE "aurora_chat_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aurora_chat_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aurora_chat_messages" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aurora_chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "aurora_chat_sessions_userId_status_updatedAt_idx" ON "aurora_chat_sessions"("userId", "status", "updatedAt");

-- CreateIndex
CREATE INDEX "aurora_chat_messages_sessionId_createdAt_idx" ON "aurora_chat_messages"("sessionId", "createdAt");

-- AddForeignKey
ALTER TABLE "aurora_chat_sessions" ADD CONSTRAINT "aurora_chat_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aurora_chat_messages" ADD CONSTRAINT "aurora_chat_messages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "aurora_chat_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
