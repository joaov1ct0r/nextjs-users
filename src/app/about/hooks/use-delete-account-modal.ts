import { MouseEvent } from "react"
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import { useAboutCtx } from "@/app/about/hooks/use-about";

export function useDeleteAccountModal() {
    const { setOpenAccountModal, deleteUser } = useAboutDispatch();
    const { shouldOpenDeleteAccountModal, showLoading } = useAboutCtx();

    const handleOnDeleteUser = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        deleteUser();
    };

    const handleOnCancelDeleteUser = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenAccountModal();
    };

    return {
        shouldOpenDeleteAccountModal,
        showLoading,
        handleOnDeleteUser,
        handleOnCancelDeleteUser
    }
}