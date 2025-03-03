import { InputForm } from "@/app/components/input-form";
import { ButtonForm } from "@/app/components/button-form";
import { LabelForm } from "@/app/components/label-form"
import { ButtonWrapper } from "@/app/components/button-wrapper/button-wrapper"
import { InputWrapper } from "@/app/components/input-wrapper/input-wrapper"
import { SignInRoot } from "@/app/signin/components/root/root";
import { SignInForm } from "@/app/signin/components/form/form"
import { SignInContent } from "@/app/signin/components/content/content"
import { ForgetPasswordModal } from "@/app/signin/components/forget-password-modal";

export const SignIn = {
  Root: SignInRoot,
  Form: SignInForm,
  Content: SignInContent,
  Label: LabelForm,
  InputWrapper,
  Input: InputForm,
  ButtonWrapper,
  Button: ButtonForm,
  ForgetPasswordModal
};
