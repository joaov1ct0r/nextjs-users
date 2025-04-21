"use client";

import { ReactNode } from "react";

export interface MenuWrapperProps {
  children: ReactNode;
}

export function MenuWrapper({ children }: MenuWrapperProps) {
  return (
    <div className="mb-2 w-[15%] h-full bg-gray-50 flex flex-col items-center">
      {children}
    </div>
  );
}
