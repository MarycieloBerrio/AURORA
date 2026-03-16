import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { completeProfileSchema } from "@/features/profile/schemas";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }

  const payload = await request.json();
  const parsedPayload = completeProfileSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json({ message: "Revisa los campos del formulario." }, { status: 400 });
  }

  const { gender, birthdate, educationalLevel } = parsedPayload.data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      gender,
      birthdate,
      educationalLevel,
    },
  });

  return NextResponse.json({ success: true });
}
