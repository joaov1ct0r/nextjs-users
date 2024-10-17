import { useContext } from "react";
import { AboutContext } from "@/app/about/contexts/about-context";

export function useAboutCtx() {
  const context = useContext(AboutContext);

  if (context === undefined) throw new Error("needs a provider");

  return context;
}
