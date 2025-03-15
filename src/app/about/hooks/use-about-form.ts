"use client"

import { MouseEvent } from "react"
import { useAboutCtx } from "@/app/about/hooks/use-about";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";

export function useAboutForm() {
const { getUser, setOpenAccountModal, setOpenUpdateUserModal } =
    useAboutDispatch();
  const {
    error,
    success,
    loading,
    user,
    shouldOpenDeleteAccountModal,
    shouldOpenUpdateUserModal,
    showLoading,
  } = useAboutCtx();

  const handleSetShouldOpenUpdateUserModal = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setOpenUpdateUserModal();
  };

  const handleSetShouldShowDeleteAccountModal = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setOpenAccountModal();
  };
    return {
        error,
        success,
        loading,
        user,
        getUser,
        shouldOpenDeleteAccountModal,
        shouldOpenUpdateUserModal,
        showLoading,
        handleSetShouldOpenUpdateUserModal,
        handleSetShouldShowDeleteAccountModal
    }
}