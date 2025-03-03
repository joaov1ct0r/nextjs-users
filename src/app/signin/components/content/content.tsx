"use client";

import { ReactNode } from "react";

export interface SignInContentProps {
  children: ReactNode;
}

export function SignInContent({ children }: SignInContentProps) {
  return <>{children}</>;
}
