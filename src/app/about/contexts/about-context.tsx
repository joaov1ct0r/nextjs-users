"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { User } from "@/app/about/interfaces/user";
import { Action } from "@/app/about/interfaces/action";
import { State } from "@/app/about/interfaces/state";
import { useApi } from "@/app/hooks/use-api";
import { setCookie } from "@/app/utils/cookies";

interface UserData {
  name: string;
  username: string;
  email: string;
  id: string;
  password: string | undefined;
}

const initialState: State = {
  success: null,
  loading: false,
  error: null,
  user: null,
};

function aboutReducer(state: State, action: Action): State {
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

const AboutContext = createContext<State | undefined>(undefined);
const AboutDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      updateUser: (user: User) => void;
    }
  | undefined
>(undefined);

interface AboutProviderProps {
  children: ReactNode;
}

export function AboutProvider({ children }: AboutProviderProps) {
  const [state, dispatch] = useReducer(aboutReducer, initialState);
  const api = useApi();

  const handleUpdateUser = async (user: User) => {
    dispatch({ type: "fetch_start" });

    const data: UserData = {
      name: user.name,
      username: user.username,
      email: user.email,
      id: user.id,
      password: undefined,
    };

    if (user.password) {
      data.password = user.password;
    }

    try {
      const response = await api.put("/user/", data);

      if (response?.status === 204) {
        const updatedUser = response.data.resource;

        setCookie({
          user: JSON.stringify(updatedUser),
        });
        dispatch({ type: "fetch_success", user: updatedUser });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to update user" });
    }
  };

  return (
    <AboutContext.Provider value={state}>
      <AboutDispatchContext.Provider
        value={{ dispatch, updateUser: handleUpdateUser }}
      >
        {children}
      </AboutDispatchContext.Provider>
    </AboutContext.Provider>
  );
}

export { AboutContext, AboutDispatchContext };
