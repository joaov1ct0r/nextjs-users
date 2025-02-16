"use client";

import React, {
  useEffect,
  useCallback,
} from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ForgetPasswordModal from "@/app/signin/components/forget-password-modal";
import {useForm} from 'react-hook-form'
import {Inputs} from "@/app/signin/interfaces/inputs"

export default function LoginForm() {
  const router = useRouter();

  const { error, success, showLoading, shouldOpenForgetPasswordModal } =
    useSignInCtx();
  const { signInUser, setOpenForgetPasswordModal } = useSignInDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const handleFormSubmit = (data: Inputs) => {
    signInUser(data);
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
      const fields = Object.keys(errors)

      fields.map((field) => toast.error(`field: ${field} is required`))
    }
  }, [errors])

  return (
    <div className="w-full h-full flex justify-center items-center">
      {shouldOpenForgetPasswordModal && <ForgetPasswordModal />}
      <form className="w-full h-1/4 px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded sm:w-1/3 sm:h-1/4 sm:px-8 sm:pt-6 sm:pb-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <InputForm
          register={register("username", { required: true })}
          label="User username"
          placeholder="User username"
          id="username"
          type="text"
          name="username"
        />
        <InputForm
          register={register("password", { required: true })}
          label="User Password"
          placeholder="User password"
          id="password"
          type="password"
          name="password"
        />

        <div className="flex items-center justify-evenly">
          <ButtonForm
            disabled={showLoading}
            model={showLoading ? "disabled" : "success"}
            placeholder="Sign in"
            type="submit"
            handleOnClick={() => null}
          />
          <ButtonForm
            disabled={showLoading}
            type="button"
            model={showLoading ? "disabled" : "warning"}
            placeholder="Sign up"
            handleOnClick={handleSignUp}
          />
          <ButtonForm
            disabled={showLoading}
            type="button"
            model={showLoading ? "disabled" : "warning"}
            placeholder="Forget password"
            handleOnClick={setOpenForgetPasswordModal}
          />
        </div>
      </form>
    </div>
  );
}
