"use client";

import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { toast } from "react-toastify";
import { User } from "@/app/about/interfaces/user";

export default function AboutForm() {
  const { user } = useSignInCtx();
  const [updatedUser, setUpdatedUser] = useState<User>({
    id: "",
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const { updateUser, getUser } = useAboutDispatch();
  const { error, success } = useAboutCtx();

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateUser(updatedUser);
  };

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      toast.success("User updated with success!");
    }
  }, [error, success]);

  useEffect(() => getUser);

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputForm
          label="User id"
          placeholder={user?.id}
          id="id"
          type="text"
          handleOnChange={handleFormChange}
          name="id"
          value={updatedUser.id}
          disabled
        />
        <InputForm
          label="User name"
          placeholder={user?.name}
          id="name"
          type="text"
          handleOnChange={handleFormChange}
          name="name"
          value={updatedUser.name}
        />
        <InputForm
          label="User email"
          placeholder={user?.email}
          id="email"
          type="email"
          handleOnChange={handleFormChange}
          name="email"
          value={updatedUser.email}
        />
        <InputForm
          label="User username"
          placeholder={user?.username}
          id="username"
          type="text"
          handleOnChange={handleFormChange}
          name="username"
          value={updatedUser.username}
        />
        <InputForm
          label="User password"
          placeholder="**********"
          id="password"
          type="password"
          handleOnChange={handleFormChange}
          name="password"
          value={updatedUser.password}
        />

        <div className="flex items-center justify-between">
          <ButtonForm
            type="submit"
            model="success"
            placeholder="Update"
            handleOnClick={handleFormSubmit}
          />
        </div>
      </form>
    </div>
  );
}
