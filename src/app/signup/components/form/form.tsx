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
      className="w-full h-1/4 px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded sm:w-1/3 sm:h-1/4 sm:px-8 sm:pt-6 sm:pb-8"
    >
      {children}
    </form>
  );
}
