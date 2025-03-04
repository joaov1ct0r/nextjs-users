"use client";

import { ReactNode } from "react";

export interface ForgetPasswordContentProps {
  children: ReactNode;
}

export function ForgetPasswordContent({
  children,
}: ForgetPasswordContentProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}
