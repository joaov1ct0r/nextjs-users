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
      className="w-[35%] h-[20%] px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded sm:w-1/3 sm:h-1/4 sm:px-8 sm:pt-6 sm:pb-8"
    >
      {children}
    </form>
  );
}
