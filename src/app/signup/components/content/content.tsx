"use client";

import { ReactNode } from "react";

export interface SignUpContentProps {
  children: ReactNode;
}

export function SignUpContent({ children }: SignUpContentProps) {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}
