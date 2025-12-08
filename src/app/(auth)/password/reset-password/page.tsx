"use client";

import { AuthTitle, ResetPasswordFormFields } from "@/components/features/auth";
import { Form } from "@/components/ui";
import { useResetPassword } from "@/hooks/auth/use-auth";
import { changePasswordSchema, ChangePasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { mutate, isPending } = useResetPassword();
  if (!token) notFound();
  const handleSubmit = async (data: ChangePasswordSchema) => {
    mutate({
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      token: token,
    });
  };

  return (
    <>
      <AuthTitle>비밀번호 재설정</AuthTitle>
      <Form<ChangePasswordSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
        mode="onChange"
        reValidateMode="onChange"
      >
        <ResetPasswordFormFields isPending={isPending} />
      </Form>
    </>
  );
}
