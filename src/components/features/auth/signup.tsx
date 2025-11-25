"use client";

import postSignUp from "@/api/auth/post-signup";
import {
  AuthDivider,
  AuthTitle,
  SocialAuthButton,
  SignUpFormFields,
} from "@/components/features/auth";
import { AuthLink } from "@/components/features/auth/auth-page";
import { Form } from "@/components/ui";
import { useAuthSuccess } from "@/hooks";
import { signUpErrorHandler } from "@/lib/error";

import { signUpSchema, SignUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const title = "회원가입";

export default function Signup() {
  const authSuccess = useAuthSuccess();

  const handleSubmit = async (data: SignUpSchema) => {
    const res = await postSignUp(data);
    await authSuccess(res);
  };
  return (
    <div>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignUpSchema>
        onSubmit={handleSubmit}
        onServerError={signUpErrorHandler}
        resolver={zodResolver(signUpSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <SignUpFormFields />
      </Form>
      <AuthLink message="이미 계정이 있으신가요?" linkText="로그인하기" href="/login" />
      <AuthDivider />
      <SocialAuthButton title={title} />
    </div>
  );
}
