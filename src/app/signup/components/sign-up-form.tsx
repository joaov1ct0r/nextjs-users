"use client";

import React, {
  MouseEvent,
  useEffect,
  useCallback,
} from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import { useSignUpCtx } from "@/app/signup/hooks/use-sign-up";
import { useSignUpDispatch } from "@/app/signup/hooks/use-sign-up-dispatch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/app/signup/schemas/sign-up-schema";
import { SignUpFormSchema } from "@/app/signup/interfaces/sign-up-form-schema";
import { getObjectErrors } from "@/app/utils/get-object-errors";

export default function SignUpForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormSchema>({
    resolver: zodResolver(SignUpSchema)
  });

  const file = watch("file")

  const router = useRouter();

  const { error, success, showLoading } = useSignUpCtx();

  const { signUpUser } = useSignUpDispatch();

  const memoizedHandleAfterSignUp = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleFormSubmit = (data: SignUpFormSchema) => {
    const { success } = SignUpSchema.safeParse(data)

    if (success) signUpUser(data);
  };

  const handleCancelSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    memoizedHandleAfterSignUp();
  };

  useEffect(() => {
      if (errors) {
        getObjectErrors(errors)
      }
  }, [errors])

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      toast.success("User signed up with success!");
      memoizedHandleAfterSignUp();
    }
  }, [error, success, memoizedHandleAfterSignUp]);

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full h-1/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
        <InputForm
          register={register("file", { required: false })}
          label="User profile image"
          placeholder="User profile image"
          id="file"
          type="file"
          name="file"
        />
        <InputForm
          register={register("name", { required: true })}
          label="User name"
          placeholder="User name"
          id="name"
          type="text"
          name="name"
        />
        <InputForm
          label="User email"
          placeholder="User email"
          id="email"
          type="email"
          register={register("email", { required: true })}
          name="email"
        />
        <InputForm
          label="User username"
          placeholder="User username"
          id="username"
          type="text"
          register={register("username", { required: true })}
          name="username"
        />
        <InputForm
          label="User password"
          placeholder="User password"
          id="password"
          type="password"
          name="password"
          register={register("password", { required: true })}
        />

        <div className="flex items-center justify-evenly">
          <ButtonForm
            disabled={showLoading}
            handleOnClick={() => null}
            type="submit"
            model={showLoading ? "disabled" : "success"}
            placeholder="Sign up"
          />
          <ButtonForm
            disabled={showLoading}
            handleOnClick={handleCancelSignUp}
            type="button"
            model={showLoading ? "disabled" : "danger"}
            placeholder="Cancel"
          />
        </div>
      </form>
    </div>
  );
}
