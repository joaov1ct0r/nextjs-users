import { MouseEvent, useState } from "react";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import { useForm } from "react-hook-form";
import { UpdateUserFormSchema } from "@/app/about/interfaces/update-user-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema } from "@/app/about/schemas/update-user-schema";

export function useUpdateUserModal() {
    const { shouldOpenUpdateUserModal, user, showLoading } = useAboutCtx();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UpdateUserFormSchema>({
        resolver: zodResolver(UpdateUserSchema),
    });

    const file = watch("file");

    const { updateUser, setOpenUpdateUserModal } = useAboutDispatch();

    const [shouldHideUpdatePassword, setShouldHideUpdatePassword] =
        useState<boolean>(true);

    const handleSetShouldUpdatePassword = () =>
        setShouldHideUpdatePassword(!shouldHideUpdatePassword);

    const handleOnCancelUpdateUserModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenUpdateUserModal();
    };

    const handleFormSubmit = (data: UpdateUserFormSchema) => {
        const { success } = UpdateUserSchema.safeParse(data);
        if (success) updateUser(data);
    };

    return {
        errors,
        shouldOpenUpdateUserModal,
        handleSubmit,
        handleFormSubmit,
        user,
        file,
        register,
        showLoading,
        handleSetShouldUpdatePassword,
        shouldHideUpdatePassword,
        handleOnCancelUpdateUserModal
    }
}