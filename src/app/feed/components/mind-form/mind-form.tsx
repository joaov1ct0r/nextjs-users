"use client";

import { FormEventHandler, ReactNode } from "react";

export interface MindFormProps {
  onSubmit: FormEventHandler;
  children: ReactNode;
}

export function MindForm({ children, onSubmit }: MindFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[50%] h-[20%] px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded"
    >
      {children}
    </form>
  );
}
