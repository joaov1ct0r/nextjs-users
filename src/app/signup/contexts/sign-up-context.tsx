"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
} from "react";
import User from "@/app/signup/interfaces/user";
import State from "@/app/signup/interfaces/state";
import { Action } from "@/app/signup/interfaces/action";
import { useApi } from "@/app/hooks/use-api";

const initialState: State = {
  success: null,
  loading: false,
  error: null,
  showLoading: false,
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
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const api = useApi();
  state.showLoading = showLoading;

  const handleSignUpUser = async (user: User) => {
    setShowLoading(true);
    dispatch({ type: "fetch_start" });

    try {
      const formData = new FormData();
      formData.append("user", JSON.stringify(user));

      if (user.file) {
        formData.append("file", user.file);
      }

      await api.post("/signup/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
