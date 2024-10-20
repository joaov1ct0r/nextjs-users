import { useContext } from "react";
import { AboutDispatchContext } from "@/app/about/contexts/about-context";

export function useAboutDispatch() {
  const context = useContext(AboutDispatchContext);

  if (context === undefined) throw new Error("needs a provider");

  return context;
}
