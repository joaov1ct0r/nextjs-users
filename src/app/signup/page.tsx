"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { getObjectErrors } from "@/app/utils/get-object-errors";
import { SignUp } from "@/app/signup/components/index";
import { useSignUpForm } from "@/app/signup/hooks/use-sign-up-form";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    file,
    handleCancelSignUp,
    handleFormSubmit,
    errors,
    showLoading,
    success,
    error,
    memoizedHandleAfterSignUp,
  } = useSignUpForm();

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
