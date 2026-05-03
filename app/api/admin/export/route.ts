import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as XLSX from "xlsx";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PROFILE_HEADERS = ["R", "I", "A", "S", "E", "C", "H", "Em", "X", "Am", "C2", "O", "RC", "DR", "IR", "MR", "SR", "SA"];
const PROFILE_LABELS  = [
  "RIASEC_R", "RIASEC_I", "RIASEC_A", "RIASEC_S", "RIASEC_E", "RIASEC_C",
  "HEXACO_H", "HEXACO_E", "HEXACO_X", "HEXACO_A", "HEXACO_C", "HEXACO_O",
  "Skill_RC", "Skill_DR", "Skill_IR", "Skill_MR", "Skill_SR", "Skill_SA",
];

const LEVEL_LABELS: Record<string, string> = {
  SECONDARY:     "Secundaria",
  TECHNICAL:     "Técnico",
  TECHNOLOGICAL: "Tecnológico",
  UNIVERSITY:    "Universitario",
  OTHER:         "Otro",
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }
  if (!session.user.isAdmin) {
    return NextResponse.json({ message: "Acceso denegado." }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id:               true,
      email:            true,
      name:             true,
      gender:           true,
      birthdate:        true,
      educationalLevel: true,
      educationalStatus:true,
      createdAt:        true,
      profile:          true,
      testRiasec1: true, testRiasec2: true, testRiasec3: true, testRiasec4: true,
      testHexaco1: true, testHexaco2: true, testHexaco3: true,
      testReadingComprehension:  true,
      testDeductiveReasoning:    true,
      testInductiveReasoning:    true,
      testMathematicalReasoning: true,
      testSpatialReasoning:      true,
      testSelectiveAttention:    true,
    },
    orderBy: { createdAt: "desc" },
  });

  const rows = users.map((u) => {
    const profile = Array.isArray(u.profile) ? (u.profile as (number | null)[]) : new Array(18).fill(null);

    const riasecDone = [u.testRiasec1, u.testRiasec2, u.testRiasec3, u.testRiasec4].filter(Boolean).length;
    const hexacoDone = [u.testHexaco1, u.testHexaco2, u.testHexaco3].filter(Boolean).length;
    const skillDone  = [
      u.testReadingComprehension, u.testDeductiveReasoning, u.testInductiveReasoning,
      u.testMathematicalReasoning, u.testSpatialReasoning, u.testSelectiveAttention,
    ].filter(Boolean).length;

    const profileCols: Record<string, number | string> = {};
    PROFILE_LABELS.forEach((label, i) => {
      const val = profile[i];
      profileCols[label] = val === null || val === undefined ? "" : Number(val.toFixed(4));
    });

    return {
      ID: u.id,
      Nombre: u.name ?? "",
      Email: u.email,
      Género: u.gender ?? "",
      "Fecha nacimiento": u.birthdate ? new Date(u.birthdate).toLocaleDateString("es-CO") : "",
      "Nivel educativo": u.educationalLevel ? (LEVEL_LABELS[u.educationalLevel] ?? u.educationalLevel) : "",
      "Estado educativo": u.educationalStatus ?? "",
      Registro: u.createdAt.toLocaleDateString("es-CO"),
      "RIASEC completados": `${riasecDone}/4`,
      "HEXACO completados": `${hexacoDone}/3`,
      "Skills completados": `${skillDone}/6`,
      ...profileCols,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook  = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Perfiles");

  // Auto-width for readability
  const colWidths = Object.keys(rows[0] ?? {}).map((key) => ({ wch: Math.max(key.length, 14) }));
  worksheet["!cols"] = colWidths;

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="aurora-perfiles-${date}.xlsx"`,
    },
  });
}
