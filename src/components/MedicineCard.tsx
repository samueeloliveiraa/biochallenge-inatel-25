"use client";
import { useState } from "react";
import { Medicine } from "@/types/medicine";
import { formatDateTime } from "@/lib/format";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface MedicineCardProps {
  medicine: Medicine;
  onEdit: (medicine: Medicine) => void;
  onDeleted: () => void;
}

export default function MedicineCard({ medicine, onEdit, onDeleted }: MedicineCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/medicines/${medicine.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Falha ao excluir medicamento");

      setConfirmOpen(false);
      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir medicamento");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-xl">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-medium text-lg text-gray-800">{medicine.name}</h3>
          <p className="text-gray-600 text-sm">Dosagem: {medicine.dosage}</p>
        </div>
        <p className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {formatDateTime(medicine.time)}
        </p>
      </div>

      {medicine.description && (
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-medium">Observações:</span> {medicine.description}
        </p>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex gap-3 mt-3">
        <Button variant="secondary" onClick={() => onEdit(medicine)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          Excluir
        </Button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Excluir medicamento"
        description={`Tem certeza que deseja excluir "${medicine.name}"? Essa ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
