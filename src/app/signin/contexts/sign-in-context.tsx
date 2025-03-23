"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
} from "react";
import { State } from "@/app/signin/interfaces/state";
import { Action } from "@/app/signin/interfaces/action";
import { signInUser } from "@/app/signin/api/sign-in-user";
import { signOutUser } from "@/app/signin/api/sign-out-user";
import { clearCookies, getCookie, setCookie } from "@/app/utils/cookies";
import { useApi } from "@/app/hooks/use-api";
import signInReducer from "@/app/signin/reducers/sign-in-reducer";
import { SignInFormSchema } from "@/app/signin/interfaces/sign-in-form-schema";

const initialState: State = {
  authenticated: false,
  success: null,
  error: null,
  loading: false,
  showLoading: false,
};

const SignInContext = createContext<State | undefined>(undefined);
const SignInDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      signInUser: (user: SignInFormSchema) => void;
      handleSignOut: () => void;
      checkAuth: () => Promise<void>;
      setShowLoading: () => void;
    }
  | undefined
>(undefined);

interface SignInProviderProps {
  children: ReactNode;
}

export function SignInProvider({ children }: SignInProviderProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(signInReducer, initialState);
  state.showLoading = showLoading;

  const api = useApi();

  const handleSetShowLoading = () => setShowLoading(!showLoading);

  const handleCheckAuth = async () => {
    const userObjCookie = await getCookie({ name: "userObj" });

    if (userObjCookie === undefined) {
      return;
    }

    dispatch({ type: "fetch_success" });
  };

  const handleSignInUser = async (user: SignInFormSchema) => {
    setShowLoading(true);
    dispatch({ type: "fetch_start" });

    try {
      const authenticatedUser = await signInUser(api, user);

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
      signOutUser(api);
      await clearCookies();
      dispatch({ type: "fetch_reset" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to sign out user" });
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
        }}
      >
        {children}
      </SignInDispatchContext.Provider>
    </SignInContext.Provider>
  );
}

export { SignInContext, SignInDispatchContext };
