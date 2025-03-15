"use client";

import { FormEventHandler, ReactNode } from "react";

export interface ForgetPasswordFormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function ForgetPasswordForm({
  children,
  onSubmit,
}: ForgetPasswordFormProps) {
  return (
    <form
      className="w-1/3 h-[15%] px-4 pt-2 pb-2 bg-white shadow-md rounded"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
