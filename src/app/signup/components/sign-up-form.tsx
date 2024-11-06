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

export default function SignUpForm() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const { error, success } = useSignUpCtx();
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

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      toast.success("User signed up with success!");
      memoizedHandleAfterSignUp();
    }
  }, [error, success, memoizedHandleAfterSignUp]);

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

        <div className="flex items-center justify-between">
          <ButtonForm
            handleOnClick={handleFormSubmit}
            type="button"
            model="success"
            placeholder="Sign up"
          />
          <ButtonForm
            handleOnClick={handleCancelSignUp}
            type="button"
            model="danger"
            placeholder="Cancel"
          />
        </div>
      </form>
    </div>
  );
}
