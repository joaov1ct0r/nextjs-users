"use client";

import { ReactNode } from "react";

export interface AboutContentProps {
  children: ReactNode;
}

export function AboutContent({ children }: AboutContentProps) {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}
