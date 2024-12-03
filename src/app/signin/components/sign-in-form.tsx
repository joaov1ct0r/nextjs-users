"use client";

import React, {
  ChangeEvent,
  useState,
  MouseEvent,
  useEffect,
  useCallback,
} from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ForgetPasswordModal from "@/app/signin/components/forget-password-modal";

export default function LoginForm() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<SignInUser>({
    username: "",
    password: "",
  });

  const { error, success, showLoading, shouldOpenForgetPasswordModal } =
    useSignInCtx();
  const { signInUser, setOpenForgetPasswordModal } = useSignInDispatch();

  const handleValidateFields = (user: SignInUser) => {
    if (!user.username) {
      toast.error("Field 'username' is obrigatory");
      return false;
    }

    if (!user.password) {
      toast.error("Field 'password' is obrigatory");
      return false;
    }

    return true;
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isAbleToSignInUser = handleValidateFields(credentials);
    if (isAbleToSignInUser) signInUser(credentials);
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const memoizedHandleSignIn = useCallback(() => {
    router.push("/about");
  }, [router]);

  useEffect(() => {
    if (success !== null && success === true && error === null) {
      memoizedHandleSignIn();
    }
  }, [memoizedHandleSignIn, error, success]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {shouldOpenForgetPasswordModal && <ForgetPasswordModal />}
      <form className="w-full h-1/4 px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded sm:w-1/3 sm:h-1/4 sm:px-8 sm:pt-6 sm:pb-8">
        <InputForm
          label="User username"
          placeholder="User username"
          id="username"
          type="text"
          handleOnChange={handleFormChange}
          name="username"
          value={credentials.username}
        />
        <InputForm
          label="User Password"
          placeholder="User password"
          id="password"
          type="password"
          handleOnChange={handleFormChange}
          name="password"
          value={credentials.password}
        />

        <div className="flex items-center justify-evenly">
          <ButtonForm
            disabled={showLoading}
            model={showLoading ? "disabled" : "success"}
            placeholder="Sign in"
            type="button"
            handleOnClick={handleFormSubmit}
          />
          <ButtonForm
            disabled={showLoading}
            type="button"
            model={showLoading ? "disabled" : "warning"}
            placeholder="Sign up"
            handleOnClick={handleSignUp}
          />
          <ButtonForm
            disabled={showLoading}
            type="button"
            model={showLoading ? "disabled" : "warning"}
            placeholder="Forget password"
            handleOnClick={setOpenForgetPasswordModal}
          />
        </div>
      </form>
    </div>
  );
}
