import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/features/profile/schemas";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsedPayload = registerSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json({ message: "Revisa los campos del formulario." }, { status: 400 });
  }

  const { email, password, name, gender, birthdate, educationalLevel } = parsedPayload.data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.json({ message: "Este correo ya está registrado." }, { status: 409 });
  }

  const passwordHash = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      gender,
      birthdate,
      educationalLevel,
    },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
