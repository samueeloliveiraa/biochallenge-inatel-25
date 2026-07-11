"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import MedicineList from "@/components/MedicineList";
import AddMedicineForm from "@/components/AddMedicineForm";

export default function DashboardPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => redirect("/login"),
  });
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName={session?.user?.name} />
      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        <AddMedicineForm onMedicineAdded={() => setRefreshList((prev) => !prev)} />
        <MedicineList refreshTrigger={refreshList} />
      </main>
    </div>
  );
}
