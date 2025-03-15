"use client";

import { ReactNode } from "react";

export interface ButtonWrapperProps {
  children: ReactNode;
}

export function ButtonWrapper({ children }: ButtonWrapperProps) {
  return <div className="flex items-center justify-end">{children}</div>;
}
