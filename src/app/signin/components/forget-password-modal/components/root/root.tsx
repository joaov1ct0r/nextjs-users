"use client";

import { ReactNode } from "react";

export interface ForgetPasswordModalRootProps {
  children: ReactNode;
}

export function ForgetPasswordModalRoot({
  children,
}: ForgetPasswordModalRootProps) {
  return <>{children}</>;
}
