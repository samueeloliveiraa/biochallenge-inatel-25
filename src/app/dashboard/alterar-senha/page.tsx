"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import FormCard from "@/components/ui/FormCard";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function AlterarSenhaPage() {
  useSession({ required: true, onUnauthenticated: () => redirect("/login") });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/alterar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao alterar senha.");
        return;
      }

      setSuccess("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormCard
      title="Alterar senha"
      footer={
        <a href="/dashboard" className="text-teal-600 hover:underline">
          Voltar ao dashboard
        </a>
      }
    >
      <Alert variant="success">{success}</Alert>
      <Alert variant="error">{error}</Alert>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Senha atual"
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <TextField
          label="Nova senha"
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={6}
          required
        />
        <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
          Atualizar senha
        </Button>
      </form>
    </FormCard>
  );
}
