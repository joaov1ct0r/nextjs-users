"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import ButtonForm from "@/app/components/button-form";
import InputForm from "@/app/components/input-form";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function ForgetPasswordModal() {
  const [email, setEmail] = useState<string>("");
  const { shouldOpenForgetPasswordModal, showLoading } = useSignInCtx();
  const { setOpenForgetPasswordModal, resetPassword } = useSignInDispatch();

  const handleValidateFields = (email: string) => {
    if (!email) {
      toast.error("Field 'email' is obrigatory");
      return false;
    }

    return true;
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleFormSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isAbleToResetPassword = handleValidateFields(email);

    if (isAbleToResetPassword) {
      resetPassword(email);
      setOpenForgetPasswordModal();
      handleClearEmail();
    }
  };

  const handleClearEmail = () => setEmail("");

  const handleOnCancelForgetPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenForgetPasswordModal();
    handleClearEmail();
  };

  return (
    <Dialog
      open={shouldOpenForgetPasswordModal}
      onClose={setOpenForgetPasswordModal}
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
                    Forget password
                  </DialogTitle>
                  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <InputForm
                      label="User email to reset password"
                      placeholder="Email to reset password"
                      id="email"
                      type="email"
                      handleOnChange={handleFormChange}
                      name="id"
                      value={email}
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
                  placeholder="Update password"
                  handleOnClick={handleFormSubmit}
                />
                <ButtonForm
                  disabled={showLoading}
                  type="submit"
                  model={showLoading ? "disabled" : "warning"}
                  placeholder="Cancel"
                  handleOnClick={handleOnCancelForgetPassword}
                />
              </>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
