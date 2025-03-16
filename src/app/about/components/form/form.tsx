"use client";

import { ReactNode, FormEventHandler } from "react";

export interface AboutFormProps {
  children: ReactNode;
  onSubmit: FormEventHandler;
}

export function AboutForm({ children, onSubmit }: AboutFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[35%] h-[52%] px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded"
    >
      {children}
    </form>
  );
}
