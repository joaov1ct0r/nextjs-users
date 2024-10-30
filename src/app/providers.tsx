import { ReactNode } from "react";
import { SignUpProvider } from "@/app/signup/contexts/sign-up-context";
import { SignInProvider } from "@/app/signin/contexts/sign-in-context";
import { AboutProvider } from "@/app/about/contexts/about-context";
import { getCookie } from "@/app/utils/cookies";
//import { getCookie, clearCookies } from "@/app/utils/cookies";

interface ProvidersProps {
  children: ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  let user = null;
  const userCookie = await getCookie({ name: "userObj" });
  if (userCookie !== undefined) user = JSON.parse(userCookie.value);

  //const handleSignOut = await clearCookies()

  return (
    <SignInProvider user={user}>
      <SignUpProvider>
        <AboutProvider>{children}</AboutProvider>
      </SignUpProvider>
    </SignInProvider>
  );
}
