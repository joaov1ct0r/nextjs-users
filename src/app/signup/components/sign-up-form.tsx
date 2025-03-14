"use client";

import React, { MouseEvent, useEffect, useCallback } from "react";
import { useSignUpCtx } from "@/app/signup/hooks/use-sign-up";
import { useSignUpDispatch } from "@/app/signup/hooks/use-sign-up-dispatch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/app/signup/schemas/sign-up-schema";
import { SignUpFormSchema } from "@/app/signup/interfaces/sign-up-form-schema";
import { getObjectErrors } from "@/app/utils/get-object-errors";
import { SignUp } from "@/app/signup/components/index";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const file = watch("file");

  const router = useRouter();

  const { error, success, showLoading } = useSignUpCtx();

  const { signUpUser } = useSignUpDispatch();

  const memoizedHandleAfterSignUp = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleFormSubmit = (data: SignUpFormSchema) => {
    const { success } = SignUpSchema.safeParse(data);

    if (success) signUpUser(data);
  };

  const handleCancelSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    memoizedHandleAfterSignUp();
  };

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors);
    }
  }, [errors]);

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      toast.success("User signed up with success!");
      memoizedHandleAfterSignUp();
    }
  }, [error, success, memoizedHandleAfterSignUp]);

  return (
    <SignUp.Root>
      <SignUp.Content>
        <SignUp.Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Image
            alt="User profile image"
            src={(() => {
              if (file && file.length > 0) {
                const url = URL.createObjectURL(file[0]);
                return url;
              }

              return "/images/default_avatar.png";
            })()}
            quality={100}
            width={200}
            height={200}
            crossOrigin="use-credentials"
          />

          <SignUp.InputWrapper>
            <SignUp.Label id={"file"}>Profile image</SignUp.Label>
            <SignUp.Input
              register={register("file", { required: false })}
              id="file"
              type="file"
            />
          </SignUp.InputWrapper>

          <SignUp.InputWrapper>
            <SignUp.Label id={"name"}>Name</SignUp.Label>
            <SignUp.Input
              register={register("name", { required: true })}
              id="name"
            />
          </SignUp.InputWrapper>

          <SignUp.InputWrapper>
            <SignUp.Label id={"email"}>Email</SignUp.Label>
            <SignUp.Input
              id="email"
              type="email"
              register={register("email", { required: true })}
            />
          </SignUp.InputWrapper>

          <SignUp.InputWrapper>
            <SignUp.Label id={"username"}>Username</SignUp.Label>
            <SignUp.Input
              id="username"
              register={register("username", { required: true })}
            />
          </SignUp.InputWrapper>

          <SignUp.InputWrapper>
            <SignUp.Label id={"password"}>Password</SignUp.Label>
            <SignUp.Input
              id="password"
              type="password"
              register={register("password", { required: true })}
            />
          </SignUp.InputWrapper>

          <SignUp.ButtonWrapper>
            <SignUp.Button
              disabled={showLoading}
              type="submit"
              model={showLoading ? "disabled" : "success"}
            >
              Sign up
            </SignUp.Button>

            <SignUp.Button
              disabled={showLoading}
              onClick={handleCancelSignUp}
              model={showLoading ? "disabled" : "danger"}
            >
              Cancel
            </SignUp.Button>
          </SignUp.ButtonWrapper>
        </SignUp.Form>
      </SignUp.Content>
    </SignUp.Root>
  );
}
