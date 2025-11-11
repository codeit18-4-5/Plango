"use client";

import {
  AuthDivider,
  AuthTitle,
  SocialAuthButton,
  SignInFormFields,
} from "@/components/features/auth";
import { Form } from "@/components/ui";
import { signInSchema, SignInSchema } from "@/constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const title = "로그인";

export default function Signup() {
  const handleSubmit = (data: object) => {
    console.log(data);
  };
  return (
    <div>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignInSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(signInSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <SignInFormFields />
      </Form>
      <div className="flex justify-center gap-3 py-6 text-base">
        <span className="text-white">아직 계정이 없으신가요?</span>
        <Link href="/signup" className="text-pink-400 underline">
          가입하기
        </Link>
      </div>
      <AuthDivider />
      <SocialAuthButton title={title} onClick={() => {}} />
    </div>
  );
}
