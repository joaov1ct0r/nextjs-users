"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { getObjectErrors } from "@/app/utils/get-object-errors";
import { About } from "@/app/about/components/index";
import {
  DialogTitle,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { useUpdateUserModal } from "@/app/about/hooks/use-update-user-modal";

export function UpdateUserModal() {
  const {
    errors,
    shouldOpenUpdateUserModal,
    handleSubmit,
    handleFormSubmit,
    user,
    file,
    register,
    showLoading,
    handleSetShouldUpdatePassword,
    shouldHideUpdatePassword,
    handleOnCancelUpdateUserModal,
  } = useUpdateUserModal();

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors);
    }
  }, [errors]);

  return (
    <Dialog
      open={shouldOpenUpdateUserModal}
      onClose={() => null}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Update user
                  </DialogTitle>
                  <About.UpdateForm onSubmit={handleSubmit(handleFormSubmit)}>
                    <Image
                      alt="User profile image"
                      src={(() => {
                        if (user && user.photoUrl && file === null) {
                          return user.photoUrl;
                        }

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

                    <About.InputWrapper>
                      <About.Label id="file">Profile image</About.Label>
                      <About.Input
                        id="file"
                        type="file"
                        register={register("file", { required: false })}
                      />
                    </About.InputWrapper>

                    <About.InputWrapper>
                      <About.Label id="id">ID</About.Label>
                      <About.Input
                        id="id"
                        disabled
                        register={register("id", {
                          required: true,
                          value: user?.id,
                        })}
                      />
                    </About.InputWrapper>

                    <About.InputWrapper>
                      <About.Label id="name">Name</About.Label>
                      <About.Input
                        id="name"
                        register={register("name", {
                          required: true,
                          value: user?.name,
                        })}
                      />
                    </About.InputWrapper>

                    <About.InputWrapper>
                      <About.Label id="email">Email</About.Label>
                      <About.Input
                        id="email"
                        type="email"
                        register={register("email", {
                          required: true,
                          value: user?.email,
                        })}
                      />
                    </About.InputWrapper>

                    <About.InputWrapper>
                      <About.Label id="username">Username</About.Label>
                      <About.Input
                        id="username"
                        register={register("username", {
                          required: true,
                          value: user?.username,
                        })}
                      />
                    </About.InputWrapper>

                    <About.ButtonWrapper>
                      <About.Button
                        disabled={showLoading}
                        model={showLoading ? "disabled" : "warning"}
                        onClick={handleSetShouldUpdatePassword}
                      >
                        Update password
                      </About.Button>
                    </About.ButtonWrapper>

                    <About.InputWrapper>
                      <About.Label
                        id="password"
                        hidden={shouldHideUpdatePassword}
                      >
                        {shouldHideUpdatePassword ? "" : "Password"}
                      </About.Label>
                      <About.Input
                        hidden={shouldHideUpdatePassword}
                        id="password"
                        type="password"
                        register={register("password", {
                          required: false,
                          value: user?.password,
                        })}
                      />
                    </About.InputWrapper>

                    <About.ButtonWrapper>
                      <About.Button
                        disabled={showLoading}
                        type="submit"
                        model={showLoading ? "disabled" : "success"}
                      >
                        Update
                      </About.Button>

                      <About.Button
                        disabled={showLoading}
                        model={showLoading ? "disabled" : "warning"}
                        onClick={handleOnCancelUpdateUserModal}
                      >
                        Cancel
                      </About.Button>
                    </About.ButtonWrapper>
                  </About.UpdateForm>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
