"use client";

import { ReactNode } from "react";

export interface SignUpRootProps {
  children: ReactNode;
}

export function SignUpRoot({ children }: SignUpRootProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}
