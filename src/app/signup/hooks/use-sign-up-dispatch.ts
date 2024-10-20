"use client";

import { useContext } from "react";
import { SignUpDispatchContext } from "@/app/signup/contexts/sign-up-context";

export function useSignUpDispatch() {
  const context = useContext(SignUpDispatchContext);

  if (context === undefined) throw new Error("needs a provider");

  return context;
}
