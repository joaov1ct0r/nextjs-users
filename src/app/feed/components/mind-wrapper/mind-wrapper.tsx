"use client";

import { ReactNode } from "react";

export interface MindWrapperProps {
  children: ReactNode;
}

export function MindWrapper({ children }: MindWrapperProps) {
  return (
    <div className="w-[50%] h-[20%] px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded">
      {children}
    </div>
  );
}
