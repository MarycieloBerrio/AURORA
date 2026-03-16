import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { findTestById } from "@/constants/floors";
import { authOptions } from "@/lib/auth";
import { testService } from "@/services/test-service";
import { testRepository } from "@/repositories/test-repository";
import type { TestFieldKey } from "@/repositories/test-repository";

const likertResponseSchema = z.object({
  questionKey: z.string().min(1),
  value: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
});

const likertPayloadSchema = z.object({
  responses: z.array(likertResponseSchema).min(1),
});

const skillPayloadSchema = z.object({
  max: z.number().int().positive(),
  points: z.number().int().min(0),
});

export async function POST(request: Request, { params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }
  if (!session.user.profileCompleted) {
    return NextResponse.json({ message: "Debes completar tu perfil antes de continuar." }, { status: 403 });
  }

  const found = findTestById(testId);
  if (!found) {
    return NextResponse.json({ message: "Prueba no encontrada." }, { status: 404 });
  }

  const testField = found.test.testField as TestFieldKey;

  const existing = await testRepository.getTestResult(session.user.id, testField);
  if (existing !== null) {
    return NextResponse.json({ message: "Ya completaste esta prueba." }, { status: 409 });
  }

  const body = await request.json();

  try {
    if (found.test.testType === "riasec") {
      const parsed = likertPayloadSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ message: "Formato de respuestas inválido." }, { status: 400 });
      }
      await testService.saveRiasecResult(session.user.id, testField, parsed.data.responses);
    } else if (found.test.testType === "hexaco") {
      const parsed = likertPayloadSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ message: "Formato de respuestas inválido." }, { status: 400 });
      }
      await testService.saveHexacoResult(session.user.id, testField, parsed.data.responses);
    } else if (found.test.testType === "skill") {
      const parsed = skillPayloadSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ message: "Formato de respuestas inválido." }, { status: 400 });
      }
      await testService.saveSkillResult(session.user.id, testField, parsed.data);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "No se pudieron guardar las respuestas." }, { status: 500 });
  }
}
