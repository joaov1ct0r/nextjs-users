import { ReactNode } from "react";

export interface LabelFormProps {
  children: ReactNode;
  id: string;
}

export function LabelForm({ children, id }: LabelFormProps) {
  return (
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold">
      {children}
    </label>
  );
}
