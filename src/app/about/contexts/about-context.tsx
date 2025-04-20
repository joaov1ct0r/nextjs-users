"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
} from "react";
import { User } from "@/app/about/interfaces/user";
import { Action } from "@/app/about/interfaces/action";
import { State } from "@/app/about/interfaces/state";
import { useApi } from "@/app/hooks/use-api";
import { setCookie, getCookie, clearCookies } from "@/app/utils/cookies";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import {aboutReducer} from "@/app/about/reducers/about-reducer"
import {deleteUser} from "@/app/about/api/delete-user"
import {getUser, GetUserParams} from "@/app/about/api/get-user"
import {updateUser} from "@/app/about/api/update-user"
import { UpdateUserFormSchema } from "@/app/about/interfaces/update-user-form-schema";

const initialState: State = {
  success: null,
  loading: false,
  error: null,
  user: null,
  shouldOpenDeleteAccountModal: false,
  shouldOpenUpdateUserModal: false,
  showLoading: false,
};

const AboutContext = createContext<State | undefined>(undefined);
const AboutDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      updateUser: (user: UpdateUserFormSchema) => void;
      getUser: () => void;
      deleteUser: () => void;
      setOpenAccountModal: () => void;
      setOpenUpdateUserModal: () => void;
      setShowLoading: () => void;
    }
  | undefined
>(undefined);

interface AboutProviderProps {
  children: ReactNode;
}

export function AboutProvider({ children }: AboutProviderProps) {
  const [shouldOpenDeleteAccountModal, setShouldOpenDeleteAccountModal] =
    useState<boolean>(false);

  const [shouldOpenUpdateUserModal, setShouldOpenUpdateUserModal] =
    useState<boolean>(false);

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(aboutReducer, initialState);
  state.shouldOpenDeleteAccountModal = shouldOpenDeleteAccountModal;
  state.shouldOpenUpdateUserModal = shouldOpenUpdateUserModal;
  state.showLoading = showLoading;

  const api = useApi();

  const { dispatch: signInDispatch } = useSignInDispatch();

  const handleSetShowLoading = () => setShowLoading(!showLoading);

  const handleSetShouldOpenDeleteAccountModal = () =>
    setShouldOpenDeleteAccountModal(!shouldOpenDeleteAccountModal);

  const handleSetShouldOpenUpdateUserModal = () =>
    setShouldOpenUpdateUserModal(!shouldOpenUpdateUserModal);

  const handleDeleteUser = async () => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    let user: User | null = null;
    const userCookie = await getCookie({ name: "userObj" });

    if (userCookie !== undefined) user = JSON.parse(userCookie.value);

    try {
      const { success } = await deleteUser(api, String(user?.id))

      if (success) {
        await clearCookies();
        dispatch({ type: "fetch_reset" });
        signInDispatch({ type: "fetch_reset" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to deactivate user" });
    } finally {
      setShowLoading(false);
    }
  };

  const handleGetUser = async () => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    let user: GetUserParams | null = null;
    const userCookie = await getCookie({ name: "userObj" });

    if (userCookie !== undefined) user = JSON.parse(userCookie.value);

    const opts = {
      name: undefined,
      email: undefined,
      username: user?.username,
    };

    try {
      const { user: returnedUser, success } = await getUser(api, opts)

      if (success) {
        dispatch({ type: "fetch_success", user: returnedUser });
        setCookie({ user: JSON.stringify(returnedUser) });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to get user" });
    } finally {
      setShowLoading(false);
    }
  };

  const handleUpdateUser = async (user: UpdateUserFormSchema) => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    let userObj: User | null = null;
    const userCookie = await getCookie({ name: "userObj" });

    if (userCookie !== undefined) userObj = JSON.parse(userCookie.value);
    if (userObj === null) return;

    const data: UpdateUserFormSchema = {
      id: userObj.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: undefined,
      file: null
    };

    if (user.password) {
      data.password = user.password;
    }

    if (user.file && user.file.length > 0) {
      data.file = user.file
    }

    try {
      const { success } = await updateUser(api, data)

      if (success) {
        let photoUrl = userObj.photoUrl

        if (data.file && data.file.length > 0) {
          photoUrl = URL.createObjectURL(data.file[0])
        }

        const updatedUser: User = {
          id: userObj.id,
          name: data.name,
          username: data.username,
          email: data.email,
          password: String(data.password),
          photoUrl,
        };

        setCookie({ user: JSON.stringify(updatedUser) });
        dispatch({ type: "fetch_success", user: updatedUser });
        await handleGetUser();
        handleSetShouldOpenUpdateUserModal();
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to update user" });
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <AboutContext.Provider value={state}>
      <AboutDispatchContext.Provider
        value={{
          dispatch,
          updateUser: handleUpdateUser,
          getUser: handleGetUser,
          deleteUser: handleDeleteUser,
          setOpenAccountModal: handleSetShouldOpenDeleteAccountModal,
          setOpenUpdateUserModal: handleSetShouldOpenUpdateUserModal,
          setShowLoading: handleSetShowLoading,
        }}
      >
        {children}
      </AboutDispatchContext.Provider>
    </AboutContext.Provider>
  );
}

export { AboutContext, AboutDispatchContext };
