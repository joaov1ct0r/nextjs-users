"use client";

import React, { ChangeEvent, useState, MouseEvent } from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import { useSignUpCtx } from "@/app/signup/hooks/use-sign-up";
import { useSignUpDispatch } from "@/app/signup/hooks/use-sign-up-dispatch";
import User from "@/app/signup/interfaces/user";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const { error, success } = useSignUpCtx();
  const { signUpUser } = useSignUpDispatch();

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
    signUpUser(user);
    clearUser();
  };

  const handleCancelSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    clearUser();
  };

  if (error !== null) {
    toast.error(error);
  }

  if (success !== null && success === true && error === null) {
    toast.success("User signed up with success!");
  }

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputForm
          placeholder="Name"
          id="name"
          type="text"
          handleOnChange={handleFormChange}
          value={user.name}
          name="name"
        />
        <InputForm
          placeholder="Email"
          id="email"
          type="email"
          handleOnChange={handleFormChange}
          value={user.email}
          name="email"
        />
        <InputForm
          placeholder="Username"
          id="username"
          type="text"
          handleOnChange={handleFormChange}
          value={user.username}
          name="username"
        />
        <InputForm
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          handleOnChange={handleFormChange}
          value={user.password}
        />

        <div className="flex items-center justify-between">
          <ButtonForm
            handleOnClick={handleFormSubmit}
            type="submit"
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
