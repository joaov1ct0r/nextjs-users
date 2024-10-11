"use client";

import { useContext } from "react";
import { SignInContext } from "@/app/signin/contexts/sign-in-context";

export function useSignInCtx() {
  const context = useContext(SignInContext);

  if (context === undefined) throw new Error("needs a provider");

  return context;
}
