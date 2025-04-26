"use client";

import { ReactNode } from "react";

export interface FeedRootProps {
  children: ReactNode;
}

export function FeedRoot({ children }: FeedRootProps) {
  return <div className="w-full h-full">{children}</div>;
}
