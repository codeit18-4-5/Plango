"use client";

import postSignIn from "@/api/auth/post-signin";
import {
  AuthDivider,
  AuthTitle,
  AuthLink,
  SocialAuthButton,
  SignInFormFields,
} from "@/components/features/auth";
import ForgotPassword from "@/components/features/auth/forgot-password";
import { Form } from "@/components/ui";
import { useAuthSuccess, useToggle } from "@/hooks";
import { loginErrorHandler } from "@/lib/error";
import { signInSchema, SignInSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const title = "로그인";

export default function Signup() {
  const authSuccess = useAuthSuccess();
  const { isOpen, setOpen, setClose } = useToggle();

  const handleSubmit = async (data: SignInSchema) => {
    const res = await postSignIn(data);
    await authSuccess(res);
  };
  return (
    <div>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignInSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(signInSchema)}
        onServerError={loginErrorHandler}
        mode="onBlur"
        reValidateMode="onChange"
      >
        <SignInFormFields onModalOpen={setOpen} />
      </Form>

      {isOpen && <ForgotPassword isOpen={isOpen} onClose={setClose} />}

      <AuthLink message="아직 계정이 없으신가요?" linkText="가입하기" href="/signup" />
      <AuthDivider />
      <SocialAuthButton title={title} />
    </div>
  );
}
