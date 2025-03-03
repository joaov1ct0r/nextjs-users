"use client";

import { ReactNode } from "react";

export interface InputWrapperProps {
  children: ReactNode;
}

export function InputWrapper({ children }: InputWrapperProps) {
  return <div className="mb-2">{children}</div>;
}
