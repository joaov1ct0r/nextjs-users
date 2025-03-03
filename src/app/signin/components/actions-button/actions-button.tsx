"use client";

import { ReactNode } from "react";

export interface ActionsButtonProps {
  children: ReactNode;
}

export function ActionsButton({ children }: ActionsButtonProps) {
  return <div className="flex items-center justify-evenly">{children}</div>;
}
