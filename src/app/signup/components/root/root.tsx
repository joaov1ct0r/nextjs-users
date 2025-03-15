"use client";

import { ReactNode } from "react";

export interface SignUpRootProps {
  children: ReactNode;
}

export function SignUpRoot({ children }: SignUpRootProps) {
  return <div className="h-screen w-screen overflow-hidden">{children}</div>;
}
