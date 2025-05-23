"use client";

import { ReactNode, FormEventHandler } from "react";

export interface SignInFormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function SignInForm({ children, onSubmit }: SignInFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[35%] h:[40%] sm:h-[20%] px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded sm:w-1/3 sm:pt-3"
    >
      {children}
    </form>
  );
}
