import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";
import { SignInRoot } from "@/app/signin/components/root/root";
import { SignInForm } from "@/app/signin/components/form/form"
import { SignInContent } from "@/app/signin/components/content/content"
import { ActionsButton } from "@/app/signin/components/actions-button/actions-button"

export const SignIn = {
  Root: SignInRoot,
  Form: SignInForm,
  Content: SignInContent,
  Input: InputForm,
  ActionsButton: ActionsButton,
  ActionButton: ButtonForm
};
