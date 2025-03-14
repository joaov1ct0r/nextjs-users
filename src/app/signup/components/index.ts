import { SignUpRoot } from "@/app/signup/components/root/root";
import { SignUpForm } from "@/app/signup/components/form/form";
import { SignUpContent } from "@/app/signup/components/content/content";
import { LabelForm } from "@/app/components/label-form";
import { InputWrapper } from "@/app/components/input-wrapper/input-wrapper";
import { InputForm } from "@/app/components/input-form";
import { ButtonWrapper } from "@/app/components/button-wrapper/button-wrapper";
import { ButtonForm } from "@/app/components/button-form";

export const SignUp = {
    Root: SignUpRoot,
    Form: SignUpForm,
    Content: SignUpContent,
    Label: LabelForm,
    InputWrapper,
    Input: InputForm,
    ButtonWrapper,
    Button: ButtonForm
}