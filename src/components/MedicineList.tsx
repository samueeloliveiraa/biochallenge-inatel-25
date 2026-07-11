"use client";
import { useCallback, useEffect, useState } from "react";
import { Medicine } from "@/types/medicine";
import MedicineCard from "@/components/MedicineCard";
import EditMedicineDialog from "@/components/EditMedicineDialog";
import EmptyState from "@/components/ui/EmptyState";

interface MedicineListProps {
  refreshTrigger?: boolean;
}

export default function MedicineList({ refreshTrigger }: MedicineListProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const fetchMedicines = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/medicines");
      if (!response.ok) throw new Error("Falha ao carregar medicamentos");

      setMedicines(await response.json());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines, refreshTrigger]);

  if (isLoading) return <p className="text-gray-500">Carregando medicamentos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Medicamentos Cadastrados</h2>

      {medicines.length === 0 && (
        <EmptyState
          title="Nenhum medicamento cadastrado."
          description="Use o formulário acima para adicionar o primeiro."
        />
      )}

      <div className="space-y-4">
        {medicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onEdit={setEditingMedicine}
            onDeleted={fetchMedicines}
          />
        ))}
      </div>

      <EditMedicineDialog
        medicine={editingMedicine}
        onClose={() => setEditingMedicine(null)}
        onSaved={() => {
          setEditingMedicine(null);
          fetchMedicines();
        }}
      />
    </div>
  );
}
