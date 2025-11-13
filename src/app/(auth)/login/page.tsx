"use client";

import PostSignIn from "@/api/auth/post-signin";
import {
  AuthDivider,
  AuthTitle,
  AuthLink,
  SocialAuthButton,
  SignInFormFields,
} from "@/components/features/auth";
import { Form } from "@/components/ui";
import { loginErrorHandler } from "@/lib/error";
import { signInSchema, SignInSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const title = "로그인";

export default function Signup() {
  const handleSubmit = async (data: SignInSchema) => {
    const res = await PostSignIn(data);
    // @TODO 로그인 성공처리 : 토큰저장, 페이지 이동
    console.log(res.data);
  };
  return (
    <div>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignInSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(signInSchema)}
        onServerError={loginErrorHandler}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <SignInFormFields />
      </Form>
      <AuthLink message="아직 계정이 없으신가요?" linkText="가입하기" href="/signup" />
      <AuthDivider />
      {/* @TODO 소셜 로그인 기능 추가 */}
      <SocialAuthButton title={title} onClick={() => {}} />
    </div>
  );
}
