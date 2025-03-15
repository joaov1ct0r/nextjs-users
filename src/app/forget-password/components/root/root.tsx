"use client";

import { ReactNode } from "react";

export interface ForgetPasswordRootProps {
  children: ReactNode;
}

export function ForgetPasswordRoot({ children }: ForgetPasswordRootProps) {
  return <div className="w-full h-full">{children}</div>;
}
