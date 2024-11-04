"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { State } from "@/app/signin/interfaces/state";
import { Action } from "@/app/signin/interfaces/action";
import { signInUser } from "@/app/signin/api/sign-in-user";
import { signOutUser } from "@/app/signin/api/sign-out-user";

const initialState: State = {
  authenticated: false,
  success: null,
  error: null,
  loading: false,
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
    }
  | undefined
>(undefined);

interface SignInProviderProps {
  children: ReactNode;
}

export function SignInProvider({ children }: SignInProviderProps) {
  const [state, dispatch] = useReducer(signInReducer, initialState);

  const handleSignInUser = (user: SignInUser) => signInUser(dispatch, user);
  const handleSignOut = () => signOutUser(dispatch);

  return (
    <SignInContext.Provider value={state}>
      <SignInDispatchContext.Provider
        value={{
          dispatch,
          signInUser: handleSignInUser,
          handleSignOut,
        }}
      >
        {children}
      </SignInDispatchContext.Provider>
    </SignInContext.Provider>
  );
}

export { SignInContext, SignInDispatchContext };
