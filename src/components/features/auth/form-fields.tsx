"use client";

import { Button, Input } from "@/components/ui";
import { ChangePasswordSchema, SendEmailSchema, SignInSchema, SignUpSchema } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { AuthField } from "./auth-page";

export function SignUpFormFields({ isPending }: { isPending: boolean }) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<SignUpSchema>();

  const [email, nickname, password, passwordConfirmation] = watch([
    "email",
    "nickname",
    "password",
    "passwordConfirmation",
  ]);
  const allFilled =
    !!email?.toString().trim() &&
    !!nickname?.toString().trim() &&
    !!password?.toString().trim() &&
    !!passwordConfirmation?.toString().trim();

  return (
    <>
      <AuthField id="email" label="이메일" errorMsg={errors.email?.message}>
        <Input.Field type="email" {...register("email")} placeholder="이메일을 입력해주세요." />
      </AuthField>

      <AuthField
        id="nickname"
        label="닉네임"
        caption="(닉네임 중복 불가, 최대 10자)"
        errorMsg={errors?.nickname?.message}
      >
        <Input.Field
          {...register("nickname")}
          placeholder="닉네임을 입력해주세요."
          maxLength={10}
        />
      </AuthField>

      <AuthField
        id="password"
        label="비밀번호"
        caption="(영문, 숫자, 특수문자[!@#$%^&*] 포함 8~30자)"
        errorMsg={errors?.password?.message}
      >
        <Input.Password {...register("password")} placeholder="비밀번호를 입력해주세요." />
      </AuthField>

      <AuthField
        id="passwordConfirmation"
        label="비밀번호 확인"
        errorMsg={errors?.passwordConfirmation?.message}
      >
        <Input.Password
          {...register("passwordConfirmation")}
          placeholder="비밀번호 확인을 입력해주세요."
        />
      </AuthField>

      <Button type="submit" className="mt-4" disabled={!allFilled || isPending}>
        회원가입
      </Button>
    </>
  );
}

export function SignInFormFields({
  onModalOpen,
  isPending,
}: {
  onModalOpen: () => void;
  isPending: boolean;
}) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<SignInSchema>();

  const [email, password] = watch(["email", "password"]);
  const allFilled = !!email?.toString().trim() && !!password?.toString().trim();
  return (
    <>
      <AuthField id="email" label="이메일" errorMsg={errors.email?.message}>
        <Input.Field type="email" {...register("email")} placeholder="이메일을 입력해주세요." />
      </AuthField>

      <AuthField id="password" label="비밀번호" errorMsg={errors?.password?.message}>
        <Input.Password {...register("password")} placeholder="비밀번호를 입력해주세요." />
      </AuthField>

      <button
        type="button"
        onClick={onModalOpen}
        className="w-full text-right text-base text-pink-400 underline"
      >
        비밀번호를 잊으셨나요?
      </button>

      <Button type="submit" className="mt-4" disabled={!allFilled || isPending}>
        로그인
      </Button>
    </>
  );
}

export function SendEmailFormField({ onClose }: { onClose: () => void }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<SendEmailSchema>();
  return (
    <>
      <AuthField id="sendEmail" label="이메일" labelHidden errorMsg={errors.sendEmail?.message}>
        <Input.Field type="email" {...register("sendEmail")} placeholder="이메일을 입력해주세요." />
      </AuthField>
      <div className="flex flex-nowrap gap-2">
        <Button type="button" intent="secondary" className="flex-1" onClick={onClose}>
          취소
        </Button>
        <Button type="submit" className="flex-1">
          링크보내기
        </Button>
      </div>
    </>
  );
}

export function ResetPasswordFormFields({ isPending }: { isPending: boolean }) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ChangePasswordSchema>();

  const [password, passwordConfirmation] = watch(["password", "passwordConfirmation"]);
  const allFilled = !!password?.toString().trim() && !!passwordConfirmation?.toString().trim();

  return (
    <>
      <AuthField
        id="password"
        label="새 비밀번호"
        caption="(영문, 숫자, 특수문자[!@#$%^&*] 포함 8~30자)"
        errorMsg={errors?.password?.message}
      >
        <Input.Password {...register("password")} placeholder="비밀번호를 입력해주세요." />
      </AuthField>

      <AuthField
        id="passwordConfirmation"
        label="새 비밀번호 확인"
        errorMsg={errors?.passwordConfirmation?.message}
      >
        <Input.Password
          {...register("passwordConfirmation")}
          placeholder="비밀번호 확인을 입력해주세요."
        />
      </AuthField>

      <Button type="submit" className="mt-4" disabled={!allFilled || isPending}>
        재설정
      </Button>
    </>
  );
}
