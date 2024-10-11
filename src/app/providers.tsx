import { ReactNode } from "react";
import { SignUpProvider } from "@/app/signup/contexts/sign-up-context";
import { SignInProvider } from "@/app/signin/contexts/sign-in-context";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SignInProvider>
      <SignUpProvider>{children}</SignUpProvider>
    </SignInProvider>
  );
}
