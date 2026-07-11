import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

type RouteContext = { params: Promise<{ id: string }> };

async function getOwnedMedicine(id: string, userId: string) {
  const medicine = await prisma.medicine.findUnique({ where: { id } });

  if (!medicine || medicine.userId !== userId) return null;

  return medicine;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Autenticação necessária" }, { status: 401 });
  }

  const medicine = await getOwnedMedicine(id, user.id);
  if (!medicine) {
    return NextResponse.json({ message: "Medicamento não encontrado" }, { status: 404 });
  }

  try {
    const { name, dosage, time, description } = await req.json();

    const updated = await prisma.medicine.update({
      where: { id },
      data: { name, dosage, time: new Date(time), description },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar medicamento:", error);
    return NextResponse.json({ message: "Erro ao atualizar medicamento" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Autenticação necessária" }, { status: 401 });
  }

  const medicine = await getOwnedMedicine(id, user.id);
  if (!medicine) {
    return NextResponse.json({ message: "Medicamento não encontrado" }, { status: 404 });
  }

  try {
    await prisma.medicine.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir medicamento:", error);
    return NextResponse.json({ message: "Erro ao excluir medicamento" }, { status: 500 });
  }
}
