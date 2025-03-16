"use client";

import React, { useEffect } from "react";
import Loading from "@/app/components/loading";
import Image from "next/image";
import { About } from "@/app/about/components";
import { useAboutForm } from "@/app/about/hooks/use-about-form";

export default function AboutPage() {
  const {
    error,
    success,
    loading,
    user,
    getUser,
    shouldOpenDeleteAccountModal,
    shouldOpenUpdateUserModal,
    showLoading,
    handleSetShouldOpenUpdateUserModal,
    handleSetShouldShowDeleteAccountModal,
  } = useAboutForm();

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
        {shouldOpenUpdateUserModal && <About.UpdateModal />}
        {shouldOpenDeleteAccountModal && <About.DeleteModal />}
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
