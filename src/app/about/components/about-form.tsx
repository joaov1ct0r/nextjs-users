"use client";

import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import { User } from "@/app/about/interfaces/user";
import { toast } from "react-toastify";
import DeleteAccountModal from "@/app/about/components/delete-account-modal";

export default function AboutForm() {
  const [shouldShowDeleteAccountModal, setShouldShowDeleteAccountModal] =
    useState<boolean>(false);
  const { updateUser, getUser } = useAboutDispatch();
  const { error, success, loading, user } = useAboutCtx();

  const [updatedUser, setUpdatedUser] = useState<User>({
    id: user?.id || "",
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const handleSetShouldShowDeleteAccountModal = (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setShouldShowDeleteAccountModal((prev) => !prev);
  };

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

    return true;
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isAbleToUpdateUser = handleValidateFields(updatedUser);
    if (isAbleToUpdateUser) updateUser(updatedUser);
  };

  useEffect(() => {
    if (
      error === null &&
      success === null &&
      loading === false &&
      user === null
    ) {
      (async () => {
        getUser();
      })();
    }
  }, [error, getUser, success, user, loading]);

  return (
    <div className="w-full max-w-xs">
      {shouldShowDeleteAccountModal && (
        <DeleteAccountModal shouldBeOpen={shouldShowDeleteAccountModal} />
      )}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputForm
          label="User id"
          placeholder={user?.id}
          id="id"
          type="text"
          handleOnChange={handleFormChange}
          name="id"
          value={user?.id}
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
          <ButtonForm
            type="submit"
            model="danger"
            placeholder="Deactivate"
            handleOnClick={handleSetShouldShowDeleteAccountModal}
          />
        </div>
      </form>
    </div>
  );
}
