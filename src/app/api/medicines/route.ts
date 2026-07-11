import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Autenticação necessária" },
        { status: 401 }
      );
    }

    const { name, dosage, time, description } = await req.json();

    const medicine = await prisma.medicine.create({
      data: {
        name,
        dosage,
        time: new Date(time),
        description,
        userId: user.id,
      },
    });

    return NextResponse.json(medicine, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return NextResponse.json(
      { message: "Erro ao cadastrar medicamento" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Autenticação necessária" },
        { status: 401 }
      );
    }

    const medicines = await prisma.medicine.findMany({
      where: { userId: user.id },
      orderBy: { time: "asc" }, // Ordena por horário mais próximo
    });

    return NextResponse.json(medicines);
  } catch (error) {
    console.error("Erro ao buscar medicamentos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar medicamentos" },
      { status: 500 }
    );
  }
}