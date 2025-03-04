import { ForgetPasswordModalRoot } from "@/app/signin/components/forget-password-modal/components/root/root"
import { ForgetPasswordModalContent } from "@/app/signin/components/forget-password-modal/components/content/content"
import { ForgetPasswordModalForm } from "@/app/signin/components/forget-password-modal/components/form/form"
import { ButtonWrapper } from "@/app/components/button-wrapper/button-wrapper"
import { LabelForm } from "@/app/components/label-form"
import { InputWrapper } from "@/app/components/input-wrapper/input-wrapper"
import { InputForm } from "@/app/components/input-form"
import { ForgetPasswordModalTitle } from "@/app/signin/components/forget-password-modal/components/title/forget-password-modal-title"
import { ButtonForm } from "@/app/components/button-form"

export const PasswordModal = {
    Root: ForgetPasswordModalRoot,
    Content: ForgetPasswordModalContent,
    Title: ForgetPasswordModalTitle,
    Form: ForgetPasswordModalForm,
    ButtonWrapper: ButtonWrapper,
    Button: ButtonForm,
    Label: LabelForm,
    InputWrapper: InputWrapper,
    Input: InputForm,
}