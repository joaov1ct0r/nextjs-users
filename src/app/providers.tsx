import { ReactNode } from "react";
import { SignUpProvider } from "@/app/signup/contexts/sign-up-context";
import { SignInProvider } from "@/app/signin/contexts/sign-in-context";
import { AboutProvider } from "@/app/about/contexts/about-context";
import { ForgetPasswordProvider } from "@/app/forget-password/contexts/forget-password-context";
import { FeedProvider } from "@/app/feed/contexts/feed-context";

interface ProvidersProps {
  children: ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  return (
    <SignInProvider>
      <ForgetPasswordProvider>
        <SignUpProvider>
          <AboutProvider>
            <FeedProvider>{children}</FeedProvider>
          </AboutProvider>
        </SignUpProvider>
      </ForgetPasswordProvider>
    </SignInProvider>
  );
}
