"use client";

import {
  AuthDivider,
  AuthTitle,
  AuthLink,
  SocialAuthButton,
  SignInFormFields,
  ForgotPassword,
} from "@/components/features/auth";
import { Form } from "@/components/ui";
import { useAuthSuccess, useToggle } from "@/hooks";
import { useSignInMutation } from "@/hooks/auth/use-auth";
import { signInErrorHandler } from "@/lib/error";
import { signInSchema, SignInSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const title = "로그인";

export default function Page() {
  const authSuccess = useAuthSuccess();
  const { isOpen, setOpen, setClose } = useToggle();
  const { mutateAsync, isPending } = useSignInMutation(authSuccess);

  const handleSubmit = async (data: SignInSchema) => {
    await mutateAsync(data);
  };

  return (
    <>
      <AuthTitle>{title}</AuthTitle>
      <Form<SignInSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(signInSchema)}
        onServerError={signInErrorHandler}
        mode="onChange"
        reValidateMode="onChange"
      >
        <SignInFormFields onModalOpen={setOpen} isPending={isPending} />
      </Form>
      {isOpen && <ForgotPassword isOpen={isOpen} onClose={setClose} />}

      <AuthLink message="아직 계정이 없으신가요?" linkText="가입하기" href="/signup" />
      <AuthDivider />
      <SocialAuthButton title={title} />
    </>
  );
}
