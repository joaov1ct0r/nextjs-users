"use client";

import React, {
  ChangeEvent,
  useState,
  MouseEvent,
  useEffect,
  useCallback,
} from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<SignInUser>({
    username: "",
    password: "",
  });

  const { error, success } = useSignInCtx();
  const { signInUser } = useSignInDispatch();

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signInUser(credentials);
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const memoizedHandleSignIn = useCallback(() => {
    router.push("/about");
  }, [router]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      toast.success("User signed in with success!");
      memoizedHandleSignIn();
    }
  }, [router, memoizedHandleSignIn, error, success]);

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputForm
          label="User"
          placeholder="User username"
          id="username"
          type="text"
          handleOnChange={handleFormChange}
          name="username"
          value={credentials.username}
        />
        <InputForm
          label="User Password"
          placeholder="Password"
          id="password"
          type="password"
          handleOnChange={handleFormChange}
          name="password"
          value={credentials.password}
        />

        <div className="flex items-center justify-between">
          <ButtonForm
            model="success"
            placeholder="Sign in"
            type="button"
            handleOnClick={handleFormSubmit}
          />
          <ButtonForm
            type="button"
            model="warning"
            placeholder="Sign up"
            handleOnClick={handleSignUp}
          />
        </div>
      </form>
    </div>
  );
}
