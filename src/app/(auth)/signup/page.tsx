"use client";

import PostSignUp from "@/api/auth/post-signup";
import {
  AuthDivider,
  AuthTitle,
  SocialAuthButton,
  SignUpFormFields,
} from "@/components/features/auth";
import { AuthLink } from "@/components/features/auth/authPage";
import { Form } from "@/components/ui";
import { axiosErrorMsg } from "@/lib/error";
import { signUpSchema, SignUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const title = "회원가입";

export default function Signup() {
  const handleSubmit = async (data: SignUpSchema) => {
    const res = await PostSignUp(data);
    // @TODO 회원가입 성공처리 : 토큰저장, 가입 후 자동 로그인 , 페이지 이동
    console.log(res.data);
  };
  return (
    <div>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignUpSchema>
        onSubmit={handleSubmit}
        onServerError={axiosErrorMsg}
        resolver={zodResolver(signUpSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <SignUpFormFields />
      </Form>
      <AuthLink message="이미 계정이 있으신가요?" linkText="로그인하기" href="/login" />
      <AuthDivider />
      {/* @TODO 소셜 로그인 기능 추가 */}
      <SocialAuthButton title={title} onClick={() => {}} />
    </div>
  );
}
