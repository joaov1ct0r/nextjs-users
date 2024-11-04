import { ReactNode } from "react";
import { SignUpProvider } from "@/app/signup/contexts/sign-up-context";
import { SignInProvider } from "@/app/signin/contexts/sign-in-context";
import { AboutProvider } from "@/app/about/contexts/about-context";

interface ProvidersProps {
  children: ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  return (
    <SignInProvider>
      <SignUpProvider>
        <AboutProvider>{children}</AboutProvider>
      </SignUpProvider>
    </SignInProvider>
  );
}
