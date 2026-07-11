"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormCard from "@/components/ui/FormCard";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function CadastroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta.");
        return;
      }

      setSuccess("Conta criada com sucesso! Redirecionando para o login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormCard
      title="Criar conta"
      footer={
        <a href="/login" className="text-teal-600 hover:underline">
          Já tem conta? Faça login
        </a>
      }
    >
      <Alert variant="success">{success}</Alert>
      <Alert variant="error">{error}</Alert>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Senha"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
          Cadastrar
        </Button>
      </form>
    </FormCard>
  );
}
