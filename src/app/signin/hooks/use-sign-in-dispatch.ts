"use client";

import { useContext } from "react";
import { SignInDispatchContext } from "@/app/signin/contexts/sign-in-context";

export function useSignInDispatch() {
  const context = useContext(SignInDispatchContext);

  if (context === undefined) throw new Error("needs a provider");

  return context;
}
