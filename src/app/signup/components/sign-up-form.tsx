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
import { useSignUpCtx } from "@/app/signup/hooks/use-sign-up";
import { useSignUpDispatch } from "@/app/signup/hooks/use-sign-up-dispatch";
import User from "@/app/signup/interfaces/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUpForm() {
  const router = useRouter();
  const [, setImgSrc] = useState<string>("");
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    username: "",
    file: null,
  });

  const { error, success, showLoading } = useSignUpCtx();
  const { signUpUser } = useSignUpDispatch();

  const memoizedHandleAfterSignUp = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleValidateFields = (user: User) => {
    if (!user.name) {
      toast.error("Field 'name' is obrigatory");
      return false;
    }

    if (!user.username) {
      toast.error("Field 'username' is obrigatory");
      return false;
    }

    if (!user.email) {
      toast.error("Field 'email' is obrigatory");
      return false;
    }

    if (!user.password) {
      toast.error("Field 'password' is obrigatory");
      return false;
    }

    return true;
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const clearUser = () =>
    setUser({
      name: "",
      username: "",
      email: "",
      password: "",
      file: null,
    });

  const handleFormSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isAbleToSignUpUser = handleValidateFields(user);
    if (isAbleToSignUpUser) signUpUser(user);
  };

  const handleCancelSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    clearUser();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImgSrc(url);
      setUser({
        ...user,
        ["file"]: event.target.files[0],
      });
    }
  };

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      toast.success("User signed up with success!");
      memoizedHandleAfterSignUp();
    }
  }, [error, success, memoizedHandleAfterSignUp]);

  return (
    <div className="w-full h-full">
      <form className="w-full h-1/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Image
          alt="User profile image"
          src={(() => {
            if (user && user.file) {
              const url = URL.createObjectURL(user.file);
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
          label="User profile image"
          placeholder="User profile image"
          id="file"
          type="file"
          handleOnChange={handleFileChange}
          name="file"
        />
        <InputForm
          label="User name"
          placeholder="User name"
          id="name"
          type="text"
          handleOnChange={handleFormChange}
          value={user.name}
          name="name"
        />
        <InputForm
          label="User email"
          placeholder="User email"
          id="email"
          type="email"
          handleOnChange={handleFormChange}
          value={user.email}
          name="email"
        />
        <InputForm
          label="User username"
          placeholder="User username"
          id="username"
          type="text"
          handleOnChange={handleFormChange}
          value={user.username}
          name="username"
        />
        <InputForm
          label="User password"
          placeholder="User password"
          id="password"
          type="password"
          name="password"
          handleOnChange={handleFormChange}
          value={user.password}
        />

        <div className="flex items-center justify-evenly">
          <ButtonForm
            disabled={showLoading}
            handleOnClick={handleFormSubmit}
            type="button"
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
