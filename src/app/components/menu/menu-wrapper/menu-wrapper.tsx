"use client";

import { ReactNode } from "react";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
export interface MenuWrapperProps {
  children: ReactNode;
}

export function MenuWrapper({ children }: MenuWrapperProps) {
  const { authenticated } = useSignInCtx();
  return (
    <div
      className={
        authenticated
          ? "mb-2 w-[15%] h-full bg-gray-50 flex flex-col items-center"
          : "hidden"
      }
    >
      {children}
    </div>
  );
}
