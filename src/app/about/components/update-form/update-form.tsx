"use client";

import { ReactNode, FormEventHandler } from "react";

export interface AboutFormUpdateProps {
  children: ReactNode;
  onSubmit: FormEventHandler;
}

export function AboutUpdateForm({ children, onSubmit }: AboutFormUpdateProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[100%] h-[50%] px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded"
    >
      {children}
    </form>
  );
}
