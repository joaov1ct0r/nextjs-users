import { FeedRoot } from "@/app/feed/components/root/root"
import { FeedContent } from "@/app/feed/components/content/content"
import { InputWrapper } from "@/app/components/input-wrapper/input-wrapper"
import { LabelForm } from "@/app/components/label-form"
import { InputForm } from "@/app/components/input-form"
import { ButtonWrapper } from "@/app/components/button-wrapper/button-wrapper"
import { ButtonForm } from "@/app/components/button-form"
import { MindForm } from "@/app/feed/components/mind-form/mind-form"
import { Posts } from "@/app/feed/components/posts/posts"
import { EditPostModal } from "@/app/feed/components/edit-post-modal/edit-post-modal"
import { DeletePostModal } from "@/app/feed/components/delete-post-modal/delete-post-modal"

export const Feed = {
    Root: FeedRoot,
    Content: FeedContent,
    InputWrapper,
    Label: LabelForm,
    Input: InputForm,
    ButtonWrapper,
    Button: ButtonForm,
    Form: MindForm,
    Posts,
    UpdateForm: EditPostModal,
    DeleteForm: DeletePostModal
}