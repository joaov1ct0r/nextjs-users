"use client";

import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const { user } = useSignInCtx();
  const { handleSignOut } = useSignInDispatch();

  const onSignOut = () => {
    handleSignOut();
    router.push("/");
  };

  return (
    <button
      onClick={onSignOut}
      className={
        user !== null
          ? "justify-end items-center bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"
          : ""
      }
    >
      Sign out
    </button>
  );
}
