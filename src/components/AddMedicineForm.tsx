"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import MedicineFormFields, { MedicineFormValues } from "@/components/MedicineFormFields";

interface AddMedicineFormProps {
  onMedicineAdded?: () => void;
}

const emptyForm: MedicineFormValues = { name: "", dosage: "", time: "", description: "" };

export default function AddMedicineForm({ onMedicineAdded }: AddMedicineFormProps) {
  const [values, setValues] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Falha ao cadastrar medicamento");

      setSuccess("Medicamento cadastrado com sucesso!");
      setValues(emptyForm);
      onMedicineAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar medicamento");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Adicionar Medicamento</h2>
      <Alert variant="error">{error}</Alert>
      <Alert variant="success">{success}</Alert>
      <form onSubmit={handleSubmit}>
        <MedicineFormFields idPrefix="add-" values={values} onChange={setValues} />
        <Button type="submit" isLoading={isSubmitting}>
          Cadastrar Medicamento
        </Button>
      </form>
    </div>
  );
}
