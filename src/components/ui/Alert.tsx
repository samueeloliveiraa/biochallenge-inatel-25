import { ReactNode } from "react";

type AlertVariant = "success" | "error";

const variantClasses: Record<AlertVariant, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  error: "bg-red-50 text-red-700 border-red-200",
};

interface AlertProps {
  variant: AlertVariant;
  children: ReactNode;
}

export default function Alert({ variant, children }: AlertProps) {
  if (!children) return null;

  return (
    <div className={`border rounded-lg px-4 py-3 mb-4 text-sm ${variantClasses[variant]}`}>
      {children}
    </div>
  );
}
