"use client";

import { ReactNode } from "react";

export interface FeedContentProps {
  children: ReactNode;
}

export function FeedContent({ children }: FeedContentProps) {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}
