"use client";

import { FormEventHandler, ReactNode } from "react";

export interface ForgetPasswordModalFormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function ForgetPasswordModalForm({
  children,
  onSubmit,
}: ForgetPasswordModalFormProps) {
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
