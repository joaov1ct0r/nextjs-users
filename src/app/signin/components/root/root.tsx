"use client";

import { ReactNode } from "react";

export interface SignInRootProps {
  children: ReactNode;
}

export function SignInRoot({ children }: SignInRootProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}
