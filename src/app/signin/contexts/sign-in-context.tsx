"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { State } from "@/app/signin/interfaces/state";
import { Action } from "@/app/signin/interfaces/action";
import { signInUser } from "@/app/signin/api/sign-in-user";
import User from "@/app/interfaces/user";

const initialState: State = {
  user: null,
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
        user: action.user,
      };
    case "fetch_error":
      return { ...state, loading: false, error: action.error, success: false };
    default:
      throw new Error("Unknown action type");
  }
}

const SignInContext = createContext<State | undefined>(undefined);
const SignInDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      signInUser: (user: SignInUser) => void;
    }
  | undefined
>(undefined);

interface SignInProviderProps {
  children: ReactNode;
  user: User | null;
}

export function SignInProvider({ children, user }: SignInProviderProps) {
  const [state, dispatch] = useReducer(signInReducer, initialState);
  state.user = user;

  const handleSignInUser = (user: SignInUser) => signInUser(dispatch, user);

  return (
    <SignInContext.Provider value={state}>
      <SignInDispatchContext.Provider
        value={{ dispatch, signInUser: handleSignInUser }}
      >
        {children}
      </SignInDispatchContext.Provider>
    </SignInContext.Provider>
  );
}

export { SignInContext, SignInDispatchContext };
