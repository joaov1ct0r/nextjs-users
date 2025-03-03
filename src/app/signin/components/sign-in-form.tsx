"use client";

import { useEffect, useCallback } from "react";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignInSchema } from "@/app/signin/schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getObjectErrors } from "@/app/utils/get-object-errors";
import { SignInFormSchema } from "@/app/signin/interfaces/sign-in-form-schema";
import { SignIn } from "@/app/signin/components/index";

export function SignInForm() {
  const router = useRouter();

  const { error, success, showLoading, shouldOpenForgetPasswordModal } =
    useSignInCtx();

  const { signInUser, setOpenForgetPasswordModal } = useSignInDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(SignInSchema),
  });

  const handleFormSubmit = (data: SignInFormSchema) => {
    const { success } = SignInSchema.safeParse(data);

    if (success) signInUser(data);
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const memoizedHandleSignIn = useCallback(() => {
    router.push("/about");
  }, [router]);

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      memoizedHandleSignIn();
    }
  }, [memoizedHandleSignIn, error, success]);

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors);
    }
  }, [errors]);

  return (
    <SignIn.Root>
      {shouldOpenForgetPasswordModal && <SignIn.ForgetPasswordModal />}
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
              onClick={setOpenForgetPasswordModal}
            >
              Forget password
            </SignIn.Button>
          </SignIn.ButtonWrapper>
        </SignIn.Form>
      </SignIn.Content>
    </SignIn.Root>
  );
}
