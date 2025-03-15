"use client";

import { ReactNode } from "react";

export interface SignInContentProps {
  children: ReactNode;
}

export function SignInContent({ children }: SignInContentProps) {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}
