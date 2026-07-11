import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function FormCard({ title, children, footer }: FormCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-indigo-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h1>
        {children}
        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </div>
    </div>
  );
}
