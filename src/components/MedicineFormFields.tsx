import { ChangeEvent } from "react";
import TextField from "@/components/ui/TextField";

export interface MedicineFormValues {
  name: string;
  dosage: string;
  time: string;
  description: string;
}

interface MedicineFormFieldsProps {
  idPrefix: string;
  values: MedicineFormValues;
  onChange: (values: MedicineFormValues) => void;
}

export default function MedicineFormFields({ idPrefix, values, onChange }: MedicineFormFieldsProps) {
  const setField =
    (field: keyof MedicineFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ ...values, [field]: e.target.value });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Nome do Medicamento"
          id={`${idPrefix}name`}
          value={values.name}
          onChange={setField("name")}
          required
        />
        <TextField
          label="Dosagem"
          id={`${idPrefix}dosage`}
          value={values.dosage}
          onChange={setField("dosage")}
          required
        />
      </div>
      <TextField
        label="Data e Horário"
        id={`${idPrefix}time`}
        type="datetime-local"
        value={values.time}
        onChange={setField("time")}
        required
      />
      <TextField
        label="Observações (opcional)"
        id={`${idPrefix}description`}
        multiline
        rows={3}
        value={values.description}
        onChange={setField("description")}
      />
    </>
  );
}
