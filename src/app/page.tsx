"use client";

import { useEffect } from "react";
import { SignIn } from "@/app/signin/components/index";
import { useSignInForm } from "@/app/signin/hooks/use-sign-in-form";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    memoizedHandleSignIn,
    handleSignUp,
    memoizedHandleForgetPassword,
    getObjectErrors,
    error,
    success,
    showLoading,
  } = useSignInForm();

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      memoizedHandleSignIn();
    }
  }, [memoizedHandleSignIn, error, success]);

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors);
    }
  }, [errors, getObjectErrors]);

  return (
    <SignIn.Root>
      <SignIn.Content>
        <SignIn.Form onSubmit={handleSubmit(handleFormSubmit)}>
          <SignIn.InputWrapper>
            <SignIn.Label id={"username"}>Username</SignIn.Label>
            <SignIn.Input
              register={register("username", { required: true })}
              id="username"
            />
          </SignIn.InputWrapper>

          <SignIn.InputWrapper>
            <SignIn.Label id={"password"}>Password</SignIn.Label>
            <SignIn.Input
              register={register("password", { required: true })}
              id="password"
              type="password"
            />
          </SignIn.InputWrapper>

          <SignIn.ButtonWrapper>
            <SignIn.Button
              disabled={showLoading}
              model={showLoading ? "disabled" : "success"}
              type="submit"
            >
              Sign in
            </SignIn.Button>
            <SignIn.Button
              disabled={showLoading}
              model={showLoading ? "disabled" : "warning"}
              onClick={handleSignUp}
            >
              Sign up
            </SignIn.Button>
            <SignIn.Button
              disabled={showLoading}
              model={showLoading ? "disabled" : "warning"}
              onClick={memoizedHandleForgetPassword}
            >
              Forget password
            </SignIn.Button>
          </SignIn.ButtonWrapper>
        </SignIn.Form>
      </SignIn.Content>
    </SignIn.Root>
  );
}
