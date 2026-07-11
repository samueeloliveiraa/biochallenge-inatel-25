import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Autenticação necessária." }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Senha atual e nova senha são obrigatórias." },
        { status: 400 }
      );
    }

    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Senha atual incorreta." }, { status: 400 });
    }

    const hashedPassword = await hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
