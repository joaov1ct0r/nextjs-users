"use client";

import { useEffect, useCallback } from "react";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { useRouter } from "next/navigation";
import ForgetPasswordModal from "@/app/signin/components/forget-password-modal";
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
      {shouldOpenForgetPasswordModal && <ForgetPasswordModal />}
      <SignIn.Content>
        <SignIn.Form onSubmit={handleSubmit(handleFormSubmit)}>
          <SignIn.Input
            register={register("username", { required: true })}
            label="User username"
            placeholder="User username"
            id="username"
            type="text"
            name="username"
          />
          <SignIn.Input
            register={register("password", { required: true })}
            label="User Password"
            placeholder="User password"
            id="password"
            type="password"
            name="password"
          />

          <SignIn.ActionsButton>
            <SignIn.ActionButton
              disabled={showLoading}
              model={showLoading ? "disabled" : "success"}
              placeholder="Sign in"
              type="submit"
              handleOnClick={() => null}
            />
            <SignIn.ActionButton
              disabled={showLoading}
              type="button"
              model={showLoading ? "disabled" : "warning"}
              placeholder="Sign up"
              handleOnClick={handleSignUp}
            />
            <SignIn.ActionButton
              disabled={showLoading}
              type="button"
              model={showLoading ? "disabled" : "warning"}
              placeholder="Forget password"
              handleOnClick={setOpenForgetPasswordModal}
            />
          </SignIn.ActionsButton>
        </SignIn.Form>
      </SignIn.Content>
    </SignIn.Root>
  );
}
