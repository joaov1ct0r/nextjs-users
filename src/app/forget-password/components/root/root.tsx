"use client";

import { ReactNode } from "react";

export interface ForgetPasswordRootProps {
  children: ReactNode;
}

export function ForgetPasswordRoot({ children }: ForgetPasswordRootProps) {
  return <div className="h-screen w-screen overflow-hidden">{children}</div>;
}
