"use client";
import { signOut } from "next-auth/react";
import Button from "@/components/ui/Button";

interface DashboardHeaderProps {
  userName?: string | null;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Controle de Medicamentos</p>
          <h1 className="text-xl font-semibold text-gray-900">Olá, {userName}</h1>
        </div>
        <div className="flex items-center gap-3">
          <a href="/dashboard/alterar-senha" className="text-sm text-teal-600 hover:underline">
            Alterar senha
          </a>
          <Button variant="secondary" onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
