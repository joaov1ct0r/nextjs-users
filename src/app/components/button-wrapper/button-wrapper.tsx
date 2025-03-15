"use client";

import { ReactNode } from "react";

export interface ButtonWrapperProps {
  children: ReactNode;
}

export function ButtonWrapper({ children }: ButtonWrapperProps) {
  return <div className="flex justify-end pt-5">{children}</div>;
}
