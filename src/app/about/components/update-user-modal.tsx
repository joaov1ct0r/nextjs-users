"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import ButtonForm from "@/app/components/button-form";
import InputForm from "@/app/components/input-form";
import Image from "next/image";
import { useForm } from 'react-hook-form'
import { UpdateUserFormSchema } from "@/app/about/interfaces/update-user-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema } from "@/app/about/schemas/update-user-schema";
import { getObjectErrors } from "@/app/utils/get-object-errors";
import {
  DialogTitle,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

export default function UpdateUserModal() {
  const { shouldOpenUpdateUserModal, user, showLoading } = useAboutCtx();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UpdateUserFormSchema>({
	  resolver: zodResolver(UpdateUserSchema)
  });

  const file = watch("file")

  const { updateUser, setOpenUpdateUserModal } = useAboutDispatch();

  const [shouldHideUpdatePassword, setShouldHideUpdatePassword] =
    useState<boolean>(true);

  const handleSetShouldUpdatePassword = () =>
    setShouldHideUpdatePassword(!shouldHideUpdatePassword);


  const handleOnCancelUpdateUserModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenUpdateUserModal();
  };

  const handleFormSubmit = (data: UpdateUserFormSchema) => {
    const { success } = UpdateUserSchema.safeParse(data);
    if (success) updateUser(data);
  };

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors)
    }
  }, [errors])

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
                  <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full h-1/4 bg-white shadow-md rounded px-8 pt-6 pb-8">
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
                    <InputForm
                      label="User profile image"
                      placeholder="User profile image"
                      id="file"
                      type="file"
                      name="file"
                      register={register("file", { required: false })}
                    />

                    <InputForm
                      label="User id"
                      placeholder={user?.id}
                      id="id"
                      type="text"
                      name="id"
                      disabled
                      register={register("id", { required: true, value: user?.id })}
                    />
                    <InputForm
                      label="User name"
                      placeholder={user?.name}
                      id="name"
                      type="text"
                      name="name"
                      register={register("name", { required: true, value: user?.name })}
                    />
                    <InputForm
                      label="User email"
                      placeholder={user?.email}
                      id="email"
                      type="email"
                      name="email"
                      register={register("email", { required: true, value: user?.email })}
                    />
                    <InputForm
                      label="User username"
                      placeholder={user?.username}
                      id="username"
                      type="text"
                      name="username"
                      register={register("username", { required: true, value: user?.username })}
                    />
                    <ButtonForm
                      disabled={showLoading}
                      type="button"
                      model={showLoading ? "disabled" : "warning"}
                      placeholder="Update password"
                      handleOnClick={handleSetShouldUpdatePassword}
                    />
                    <InputForm
                      hidden={shouldHideUpdatePassword}
                      label={shouldHideUpdatePassword ? "" : "User password"}
                      placeholder="**********"
                      id="password"
                      type="password"
                      name="password"
                      register={register("password", { required: false, value: user?.password })}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around items-center bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <>
                <ButtonForm
                  disabled={showLoading}
                  type="submit"
                  model={showLoading ? "disabled" : "success"}
                  placeholder="Update"
                  handleOnClick={() => null}
                />
                <ButtonForm
                  disabled={showLoading}
                  type="submit"
                  model={showLoading ? "disabled" : "warning"}
                  placeholder="Cancel"
                  handleOnClick={handleOnCancelUpdateUserModal}
                />
              </>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
