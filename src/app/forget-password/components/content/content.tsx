"use client";

import { ReactNode } from "react";

export interface ForgetPasswordContentProps {
  children: ReactNode;
}

export function ForgetPasswordContent({
  children,
}: ForgetPasswordContentProps) {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}
