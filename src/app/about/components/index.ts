import { InputForm } from "@/app/components/input-form";
import { ButtonForm } from "@/app/components/button-form";
import { LabelForm } from "@/app/components/label-form"
import { ButtonWrapper } from "@/app/components/button-wrapper/button-wrapper"
import { InputWrapper } from "@/app/components/input-wrapper/input-wrapper"
import { AboutRoot } from "@/app/about/components/root/root"
import { AboutContent } from "@/app/about/components/content/content"
import { AboutForm } from "@/app/about/components/form/form"
import { DeleteAccountModal } from "@/app/about/components/delete-modal/delete-account-modal"
import { UpdateUserModal } from "@/app/about/components/update-user-modal";
import { AboutUpdateForm } from "@/app/about/components/update-form/update-form";

export const About = {
    Root: AboutRoot,
    Content: AboutContent,
    Form: AboutForm,
    InputWrapper,
    Label: LabelForm,
    Input: InputForm,
    ButtonWrapper,
    Button: ButtonForm,
    DeleteModal: DeleteAccountModal,
    UpdateModal: UpdateUserModal,
    UpdateForm: AboutUpdateForm
}