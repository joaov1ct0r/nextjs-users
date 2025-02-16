"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
} from "react";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { State } from "@/app/signin/interfaces/state";
import { Action } from "@/app/signin/interfaces/action";
import { signInUser } from "@/app/signin/api/sign-in-user";
import { signOutUser } from "@/app/signin/api/sign-out-user"
import {resetPassword} from "@/app/signin/api/reset-password"
import { clearCookies, getCookie, setCookie } from "@/app/utils/cookies";
import { useApi } from "@/app/hooks/use-api";
import signInReducer from "@/app/signin/reducers/sign-in-reducer";

const initialState: State = {
  authenticated: false,
  success: null,
  error: null,
  loading: false,
  showLoading: false,
  shouldOpenForgetPasswordModal: false,
};

const SignInContext = createContext<State | undefined>(undefined);
const SignInDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      signInUser: (user: SignInUser) => void;
      handleSignOut: () => void;
      checkAuth: () => Promise<void>;
      resetPassword: (email: string) => Promise<void>;
      setShowLoading: () => void;
      setOpenForgetPasswordModal: () => void;
    }
  | undefined
>(undefined);

interface SignInProviderProps {
  children: ReactNode;
}

export function SignInProvider({ children }: SignInProviderProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [shouldOpenForgetPasswordModal, setShouldOpenForgetPasswordModal] =
    useState<boolean>(false);

  const [state, dispatch] = useReducer(signInReducer, initialState);
  state.showLoading = showLoading;
  state.shouldOpenForgetPasswordModal = shouldOpenForgetPasswordModal;

  const api = useApi();
  
  const handleSetShouldOpenForgetPasswordModal = () =>
    setShouldOpenForgetPasswordModal(!shouldOpenForgetPasswordModal);

  const handleSetShowLoading = () => setShowLoading(!showLoading);

  const handleCheckAuth = async () => {
    const userObjCookie = await getCookie({ name: "userObj" });

    if (userObjCookie === undefined) {
      return;
    }

    dispatch({ type: "fetch_success" });
  };

  const handleSignInUser = async (user: SignInUser) => {
    setShowLoading(true);
    dispatch({ type: "fetch_start" });

    try {
      const authenticatedUser = signInUser(api, user)

      await setCookie({
        user: JSON.stringify(authenticatedUser),
      });

      dispatch({ type: "fetch_success" });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "fetch_error",
        error: "Failed to sign in user",
      });
    } finally {
      setShowLoading(false);
    }
  };

  const handleSignOut = async () => {
    dispatch({ type: "fetch_start" });

    try {
      signOutUser(api)
      await clearCookies();
      dispatch({ type: "fetch_reset" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to sign out user" });
    }
  };

  const handleResetPassword = async (email: string) => {
    setShowLoading(true);
    dispatch({ type: "fetch_start" });

    try {
      resetPassword(api, email)
      dispatch({ type: "fetch_success" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to reset password" });
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <SignInContext.Provider value={state}>
      <SignInDispatchContext.Provider
        value={{
          setShowLoading: handleSetShowLoading,
          dispatch,
          signInUser: handleSignInUser,
          handleSignOut,
          checkAuth: handleCheckAuth,
          resetPassword: handleResetPassword,
          setOpenForgetPasswordModal: handleSetShouldOpenForgetPasswordModal,
        }}
      >
        {children}
      </SignInDispatchContext.Provider>
    </SignInContext.Provider>
  );
}

export { SignInContext, SignInDispatchContext };
