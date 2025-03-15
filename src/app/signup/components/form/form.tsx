"use client";

import { ReactNode, FormEventHandler } from "react";

export interface SignUpFormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function SignUpForm({ children, onSubmit }: SignUpFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-1/2 h-[60%] px-4 pt-6 pb-6 bg-white shadow-md rounded"
    >
      {children}
    </form>
  );
}
