"use client";

import {
  AuthDivider,
  AuthTitle,
  SocialAuthButton,
  SignUpFormFields,
  AuthLink,
} from "@/components/features/auth";
import { Form } from "@/components/ui";
import { useAuthSuccess } from "@/hooks";
import { useSignUpMutation } from "@/hooks/auth/use-auth";
import { signUpErrorHandler } from "@/lib/error";

import { signUpSchema, SignUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const title = "회원가입";

export default function Page() {
  const authSuccess = useAuthSuccess();
  const { mutateAsync, isPending } = useSignUpMutation(authSuccess);
  const handleSubmit = async (data: SignUpSchema) => {
    await mutateAsync(data);
  };
  return (
    <>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignUpSchema>
        onSubmit={handleSubmit}
        onServerError={signUpErrorHandler}
        resolver={zodResolver(signUpSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <SignUpFormFields isPending={isPending} />
      </Form>
      <AuthLink message="이미 계정이 있으신가요?" linkText="로그인하기" href="/login" />
      <AuthDivider />
      <SocialAuthButton title={title} />
    </>
  );
}
