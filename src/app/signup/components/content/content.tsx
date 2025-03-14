"use client";

import { ReactNode } from "react";

export interface SignUpContentProps {
  children: ReactNode;
}

export function SignUpContent({ children }: SignUpContentProps) {
  return <>{children}</>;
}
