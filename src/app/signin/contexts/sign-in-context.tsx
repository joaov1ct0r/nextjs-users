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
//import { signInUser } from "@/app/signin/api/sign-in-user";
import { clearCookies, getCookie, setCookie } from "@/app/utils/cookies";
import { useApi } from "@/app/hooks/use-api";

const initialState: State = {
  authenticated: false,
  success: null,
  error: null,
  loading: false,
  showLoading: false,
};

function signInReducer(state: State, action: Action): State {
  switch (action.type) {
    case "fetch_start":
      return { ...state, loading: true, error: null, success: null };
    case "fetch_success":
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        authenticated: true,
      };
    case "fetch_error":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false,
        authenticated: false,
      };
    case "fetch_reset":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        authenticated: false,
        showLoading: false,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const SignInContext = createContext<State | undefined>(undefined);
const SignInDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      signInUser: (user: SignInUser) => void;
      handleSignOut: () => void;
      checkAuth: () => Promise<void>;
      resetPassword: (email: string) => Promise<void>;
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
  const api = useApi();
  state.showLoading = showLoading;

  const handleSignInUser = async (user: SignInUser) => {
    setShowLoading(true);
    dispatch({ type: "fetch_start" });

    try {
      const response = await api.post("/signin/", user);
      const authenticatedUser = response.data.resource;

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

    //signInUser(dispatch, user);
  };

  const handleSignOut = async () => {
    dispatch({ type: "fetch_start" });

    try {
      await api.get("/signout/");
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
      await api.put("/reset_password/", { email });
      dispatch({ type: "fetch_success" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to reset password" });
    } finally {
      setShowLoading(false);
    }
  };

  const handleSetShowLoading = () => setShowLoading(!showLoading);

  const handleCheckAuth = async () => {
    const userObjCookie = await getCookie({ name: "userObj" });

    if (userObjCookie === undefined) {
      return;
    }

    dispatch({ type: "fetch_success" });
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
        }}
      >
        {children}
      </SignInDispatchContext.Provider>
    </SignInContext.Provider>
  );
}

export { SignInContext, SignInDispatchContext };
