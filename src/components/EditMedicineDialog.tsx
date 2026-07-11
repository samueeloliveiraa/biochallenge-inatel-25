"use client";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Medicine } from "@/types/medicine";
import { toDatetimeLocalValue } from "@/lib/format";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import MedicineFormFields, { MedicineFormValues } from "@/components/MedicineFormFields";

interface EditMedicineDialogProps {
  medicine: Medicine | null;
  onClose: () => void;
  onSaved: () => void;
}

const emptyForm: MedicineFormValues = { name: "", dosage: "", time: "", description: "" };

export default function EditMedicineDialog({ medicine, onClose, onSaved }: EditMedicineDialogProps) {
  const [values, setValues] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!medicine) return;

    setValues({
      name: medicine.name,
      dosage: medicine.dosage,
      time: toDatetimeLocalValue(medicine.time),
      description: medicine.description ?? "",
    });
    setError("");
  }, [medicine]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicine) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/medicines/${medicine.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Falha ao salvar alterações");

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar alterações");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={medicine !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
            Editar medicamento
          </Dialog.Title>
          <Alert variant="error">{error}</Alert>
          <form onSubmit={handleSubmit}>
            <MedicineFormFields idPrefix="edit-" values={values} onChange={setValues} />
            <div className="flex justify-end gap-3 mt-2">
              <Dialog.Close asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button type="submit" isLoading={isSubmitting}>
                Salvar
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
