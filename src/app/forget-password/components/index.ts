import { ForgetPasswordRoot } from "@/app/forget-password/components/root/root"
import { ForgetPasswordContent } from "@/app/forget-password/components/content/content"
import { ForgetPasswordForm } from "@/app/forget-password/components/form/form"
import { ButtonWrapper } from "@/app/components/button-wrapper/button-wrapper"
import { LabelForm } from "@/app/components/label-form"
import { InputWrapper } from "@/app/components/input-wrapper/input-wrapper"
import { InputForm } from "@/app/components/input-form"
import { ButtonForm } from "@/app/components/button-form"

export const PasswordModal = {
    Root: ForgetPasswordRoot,
    Content: ForgetPasswordContent,
    Form: ForgetPasswordForm,
    ButtonWrapper: ButtonWrapper,
    Button: ButtonForm,
    Label: LabelForm,
    InputWrapper: InputWrapper,
    Input: InputForm,
}