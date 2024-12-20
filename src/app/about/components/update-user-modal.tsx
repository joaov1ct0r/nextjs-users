"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import { User } from "@/app/about/interfaces/user";
import {
  DialogTitle,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import ButtonForm from "@/app/components/button-form";
import InputForm from "@/app/components/input-form";
import { toast } from "react-toastify";
import Image from "next/image";

export default function UpdateUserModal() {
  const { shouldOpenUpdateUserModal, user, showLoading } = useAboutCtx();
  const [updatedUser, setUpdatedUser] = useState<User>({
    id: user?.id || "",
    name: user?.name || "",
    username: user?.username || "",
    password: user?.password || "",
    email: user?.email || "",
    photoUrl: user?.photoUrl || null,
  });

  const [shouldHideUpdatePassword, setShouldHideUpdatePassword] =
    useState<boolean>(true);

  const handleSetShouldUpdatePassword = () =>
    setShouldHideUpdatePassword(!shouldHideUpdatePassword);

  const [, setImgSrc] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const handleClearUpdatedUser = () =>
    setUpdatedUser({
      id: user?.id || "",
      name: "",
      username: "",
      email: "",
      password: "",
      photoUrl: null,
    });

  const { updateUser, setOpenUpdateUserModal } = useAboutDispatch();

  const handleOnCancelUpdateUserModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenUpdateUserModal();
    handleClearUpdatedUser();
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
    if (isAbleToUpdateUser) {
      updateUser(updatedUser, file);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImgSrc(url);
      setFile(event.target.files[0]);
    }
  };

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
                  <form className="w-full h-1/4 bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <Image
                      alt="User profile image"
                      src={(() => {
                        if (user && user.photoUrl && file === null) {
                          return user.photoUrl;
                        }

                        if (file !== null) {
                          const url = URL.createObjectURL(file);
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
                      handleOnChange={handleFormChange}
                      name="password"
                      value={updatedUser.password}
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
                  handleOnClick={handleFormSubmit}
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
