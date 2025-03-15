"use client";

import React, { useEffect, MouseEvent } from "react";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import DeleteAccountModal from "@/app/about/components/delete-account-modal";
import UpdateUserModal from "@/app/about/components/update-user-modal";
import Loading from "@/app/components/loading";
import Image from "next/image";
import { About } from "@/app/about/components";

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
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setOpenUpdateUserModal();
  };

  const handleSetShouldShowDeleteAccountModal = (
    e: MouseEvent<HTMLButtonElement>
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
    <About.Root>
      <About.Content>
        {shouldOpenUpdateUserModal && <UpdateUserModal />}
        {shouldOpenDeleteAccountModal && <DeleteAccountModal />}
        {showLoading ? (
          <Loading />
        ) : (
          <About.Form onSubmit={() => null}>
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

            <About.InputWrapper>
              <About.Label id="id">ID</About.Label>
              <About.Input placeholder={user?.id} disabled id="id" />
            </About.InputWrapper>

            <About.InputWrapper>
              <About.Label id="name">Name</About.Label>
              <About.Input disabled placeholder={user?.name} id="name" />
            </About.InputWrapper>

            <About.InputWrapper>
              <About.Label id="email">Email</About.Label>
              <About.Input disabled placeholder={user?.email} id="email" />
            </About.InputWrapper>

            <About.InputWrapper>
              <About.Label id="username">Username</About.Label>
              <About.Input
                disabled
                placeholder={user?.username}
                id="username"
              />
            </About.InputWrapper>

            <About.ButtonWrapper>
              <About.Button
                disabled={showLoading}
                model={showLoading ? "disabled" : "success"}
                onClick={handleSetShouldOpenUpdateUserModal}
              >
                Update
              </About.Button>
              <About.Button
                disabled={showLoading}
                model={showLoading ? "disabled" : "danger"}
                onClick={handleSetShouldShowDeleteAccountModal}
              >
                Deactivate
              </About.Button>
            </About.ButtonWrapper>
          </About.Form>
        )}
      </About.Content>
    </About.Root>
  );
}
