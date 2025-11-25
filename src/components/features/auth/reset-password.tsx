"use client";

import patchResetPassword from "@/api/user/patch-reset-password";
import { AuthTitle } from "@/components/features/auth";
import { ResetPasswordFormFields } from "@/components/features/auth/form-fields";
import { Form } from "@/components/ui";
import { changePasswordSchema, ChangePasswordSchema } from "@/lib/schema";
import { useUIStore } from "@/store/auth.store";
import { UserResetPassword } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

export default function PasswordRedirect() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const setAuthError = useUIStore(state => state.setAuthError);

  const handleSubmit = async (data: ChangePasswordSchema) => {
    if (!token) return;
    const payload: UserResetPassword = {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      token: token,
    };
    try {
      await patchResetPassword(payload);
      // @TODO toast로 대체할 예정
      setAuthError("비밀번호가 변경되었습니다.");
      router.replace("/login");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
      setAuthError("비밀번호 재설정에 실패하였습니다.");
    }
  };

  return (
    <div>
      <AuthTitle>비밀번호 재설정</AuthTitle>
      <Form<ChangePasswordSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
        mode="onBlur"
        reValidateMode="onChange"
      >
        <ResetPasswordFormFields />
      </Form>
    </div>
  );
}
