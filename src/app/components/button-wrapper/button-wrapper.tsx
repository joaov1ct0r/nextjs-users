"use client";

import { ReactNode } from "react";

export interface ButtonWrapperProps {
  children: ReactNode;
}

export function ButtonWrapper({ children }: ButtonWrapperProps) {
  return (
    <div className="flex flex-col justify-center items-center pt-5 sm:justify-end sm:flex-row sm:pt-1">
      {children}
    </div>
  );
}
