"use client";

import { useEffect } from "react";
import { useForgetPassword } from "@/app/forget-password/hooks/use-forget-password";
import { PasswordModal } from "@/app/forget-password/components/index";

export default function ForgetPasswordPage() {
  const {
    errors,
    getObjectErrors,
    handleSubmit,
    handleFormSubmit,
    register,
    showLoading,
    handleOnCancelForgetPassword,
  } = useForgetPassword();

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors);
    }
  }, [errors, getObjectErrors]);

  return (
    <PasswordModal.Root>
      <PasswordModal.Content>
        <PasswordModal.Form onSubmit={handleSubmit(handleFormSubmit)}>
          <PasswordModal.InputWrapper>
            <PasswordModal.Label id="email">
              Email to reset password
            </PasswordModal.Label>
            <PasswordModal.Input
              register={register("email", { required: true })}
            />
          </PasswordModal.InputWrapper>

          <PasswordModal.ButtonWrapper>
            <PasswordModal.Button
              type="submit"
              model={showLoading ? "disabled" : "success"}
              disabled={showLoading}
            >
              Reset password
            </PasswordModal.Button>
            <PasswordModal.Button
              type="button"
              model={showLoading ? "disabled" : "warning"}
              disabled={showLoading}
              onClick={handleOnCancelForgetPassword}
            >
              Cancel
            </PasswordModal.Button>
          </PasswordModal.ButtonWrapper>
        </PasswordModal.Form>
      </PasswordModal.Content>
    </PasswordModal.Root>
  );
}
