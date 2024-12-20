"use client";

import React, { useEffect, MouseEvent } from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import DeleteAccountModal from "@/app/about/components/delete-account-modal";
import UpdateUserModal from "@/app/about/components/update-user-modal";
import Loading from "@/app/components/loading";
import Image from "next/image";

export default function AboutForm() {
  const { getUser, setOpenAccountModal, setOpenUpdateUserModal } =
    useAboutDispatch();
  const {
    error,
    success,
    loading,
    user,
    shouldOpenDeleteAccountModal,
    shouldOpenUpdateUserModal,
    showLoading,
  } = useAboutCtx();

  const handleSetShouldOpenUpdateUserModal = (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setOpenUpdateUserModal();
  };

  const handleSetShouldShowDeleteAccountModal = (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setOpenAccountModal();
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
    <div className="w-full h-full">
      {shouldOpenUpdateUserModal && <UpdateUserModal />}
      {shouldOpenDeleteAccountModal && <DeleteAccountModal />}
      {showLoading ? (
        <Loading />
      ) : (
        <form className="w-full h-1/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Image
            alt="User profile image"
            src={(() => {
              if (user && user.photoUrl) {
                return user.photoUrl;
              }

              return "/images/default_avatar.png";
            })()}
            quality={100}
            width={200}
            height={200}
            crossOrigin="use-credentials"
          />
          <InputForm
            label="User id"
            placeholder={user?.id}
            disabled
            id="id"
            type="text"
            handleOnChange={() => null}
            name="id"
            value={user?.id}
          />
          <InputForm
            disabled
            label="User name"
            placeholder={user?.name}
            id="name"
            type="text"
            handleOnChange={() => null}
            name="name"
            value={user?.name}
          />
          <InputForm
            disabled
            label="User email"
            placeholder={user?.email}
            id="email"
            type="email"
            handleOnChange={() => null}
            name="email"
            value={user?.email}
          />
          <InputForm
            disabled
            label="User username"
            placeholder={user?.username}
            id="username"
            type="text"
            handleOnChange={() => null}
            name="username"
            value={user?.username}
          />

          <div className="flex flex-row items-center justify-around">
            <ButtonForm
              disabled={showLoading}
              type="submit"
              model={showLoading ? "disabled" : "success"}
              placeholder="Update"
              handleOnClick={handleSetShouldOpenUpdateUserModal}
            />
            <ButtonForm
              disabled={showLoading}
              type="submit"
              model={showLoading ? "disabled" : "danger"}
              placeholder="Deactivate"
              handleOnClick={handleSetShouldShowDeleteAccountModal}
            />
          </div>
        </form>
      )}
    </div>
  );
}
