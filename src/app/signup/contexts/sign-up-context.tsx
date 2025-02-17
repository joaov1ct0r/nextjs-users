"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
} from "react";
import State from "@/app/signup/interfaces/state";
import { Action } from "@/app/signup/interfaces/action";
import { useApi } from "@/app/hooks/use-api";
import { signUpReducer } from "@/app/signup/reducers/sign-up-reducer"
import { signUpUser } from "@/app/signup/api/sign-up-user";
import {SignUpFormSchema} from "@/app/signup/interfaces/sign-up-form-schema"

const initialState: State = {
  success: null,
  loading: false,
  error: null,
  showLoading: false,
};

const SignUpContext = createContext<State | undefined>(undefined);
const SignUpDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      signUpUser: (user: SignUpFormSchema) => void;
    }
  | undefined
>(undefined);

interface SignUpProviderProps {
  children: ReactNode;
}

export function SignUpProvider({ children }: SignUpProviderProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(signUpReducer, initialState);
  state.showLoading = showLoading;

  const api = useApi();

  const handleSignUpUser = async (user: SignUpFormSchema) => {
    setShowLoading(true);
    dispatch({ type: "fetch_start" });

    try {
      signUpUser(api, user)
      dispatch({ type: "fetch_success" });
    } catch (e) {
      console.error(e);
      dispatch({ type: "fetch_error", error: "Failed to sign up user" });
    } finally {
      setShowLoading(false);
    }
  };

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
