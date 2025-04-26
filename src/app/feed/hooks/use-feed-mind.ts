import { useFeedDispatch } from "@/app/feed/hooks/use-feed-dispatch";
import { useForm } from "react-hook-form";
import { CreatePostFormSchema } from "@/app/feed/interfaces/create-post-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/app/feed/schemas/create-post-schema";
import { useFeedCtx } from "./use-feed";

export function useFeedMind() {
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors }
    } = useForm<CreatePostFormSchema>({
        resolver: zodResolver(CreatePostSchema)
    })

    const { showLoading } = useFeedCtx()

    const { createPost } = useFeedDispatch()

    const handleFormSubmit = (data: CreatePostFormSchema) => {
        const { success } = CreatePostSchema.safeParse(data)

        if (success) {
            createPost(data)
            resetField("content")
        }
    }

    return { handleFormSubmit, register, handleSubmit, errors, showLoading }
}