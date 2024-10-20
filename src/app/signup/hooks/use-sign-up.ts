"use client";

import { useContext } from "react";
import { SignUpContext } from "@/app/signup/contexts/sign-up-context";

export function useSignUpCtx() {
  const context = useContext(SignUpContext);

  if (context === undefined) throw new Error("needs a provider");

  return context;
}
