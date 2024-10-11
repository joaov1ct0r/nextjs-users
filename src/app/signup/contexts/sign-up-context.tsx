"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";
import User from "@/app/signup/interfaces/user";
import State from "@/app/signup/interfaces/state";
import { Action } from "@/app/signup/interfaces/action";
import signUpUser from "@/app/signup/api/sign-up-user";

const initialState: State = {
  success: null,
  loading: false,
  error: null,
};

function signUpReducer(state: State, action: Action): State {
  switch (action.type) {
    case "fetch_start":
      return { ...state, loading: true, error: null, success: null };
    case "fetch_success":
      return { ...state, loading: false, success: true, error: null };
    case "fetch_error":
      return { ...state, loading: false, error: action.error, success: false };
    default:
      throw new Error("Unknown action type");
  }
}

const SignUpContext = createContext<State | undefined>(undefined);
const SignUpDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      signUpUser: (user: User) => void;
    }
  | undefined
>(undefined);

interface SignUpProviderProps {
  children: ReactNode;
}

export function SignUpProvider({ children }: SignUpProviderProps) {
  const [state, dispatch] = useReducer(signUpReducer, initialState);

  const handleSignUpUser = (user: User) => signUpUser(dispatch, user);

  return (
    <SignUpContext.Provider value={state}>
      <SignUpDispatchContext.Provider
        value={{ dispatch, signUpUser: handleSignUpUser }}
      >
        {children}
      </SignUpDispatchContext.Provider>
    </SignUpContext.Provider>
  );
}

export { SignUpContext, SignUpDispatchContext };
