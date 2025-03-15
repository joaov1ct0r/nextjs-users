"use client";

import { ReactNode } from "react";

export interface AboutRootProps {
  children: ReactNode;
}

export function AboutRoot({ children }: AboutRootProps) {
  return <div className="w-full h-full">{children}</div>;
}
