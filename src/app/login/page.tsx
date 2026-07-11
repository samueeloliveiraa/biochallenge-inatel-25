"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import FormCard from "@/components/ui/FormCard";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("Email ou senha incorretos.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <FormCard
      title="Entrar"
      footer={
        <>
          <a href="/cadastro" className="text-teal-600 hover:underline">
            Criar conta
          </a>
        </>
      }
    >
      <div className="flex justify-center mb-6">
        <Image src="/medico.png" alt="" width={72} height={72} priority />
      </div>
      <Alert variant="error">{error}</Alert>
      <form onSubmit={handleSubmit}>
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
          required
        />
        <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
          Entrar
        </Button>
      </form>
    </FormCard>
  );
}
