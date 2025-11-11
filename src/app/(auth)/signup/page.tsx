"use client";

import {
  AuthDivider,
  AuthTitle,
  SocialAuthButton,
  SignUpFormFields,
} from "@/components/features/auth";
import { Form } from "@/components/ui";
import { signUpSchema, SignUpSchema } from "@/constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const title = "회원가입";

export default function Signup() {
  const handleSubmit = (data: object) => {
    console.log(data);
  };
  return (
    <div>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignUpSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(signUpSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <SignUpFormFields />
      </Form>
      <AuthDivider />
      <SocialAuthButton title={title} onClick={() => {}} />
    </div>
  );
}
