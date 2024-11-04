"use client";

import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const { authenticated } = useSignInCtx();
  const { handleSignOut, checkAuth } = useSignInDispatch();

  const onSignOut = () => {
    handleSignOut();
    router.push("/");
  };

  useEffect(() => {
    if (authenticated === false) {
      (async () => await checkAuth())();
    }
  }, [authenticated, checkAuth]);

  return (
    <button
      onClick={onSignOut}
      className={
        authenticated === true
          ? "justify-end items-center bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"
          : "hidden"
      }
    >
      Sign out
    </button>
  );
}
