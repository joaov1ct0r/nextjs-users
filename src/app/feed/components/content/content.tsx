"use client";

import { ReactNode } from "react";

export interface FeedContentProps {
  children: ReactNode;
}

export function FeedContent({ children }: FeedContentProps) {
  return <div className="h-full flex flex-col items-center">{children}</div>;
}
