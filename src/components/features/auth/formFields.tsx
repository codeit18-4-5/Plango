"use client";

import { Button, Input } from "@/components/ui";
import { SignInSchema, SignUpSchema } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { AuthField } from "./authPage";

export function SignUpFormFields() {
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

      <Input id="nickname" errorMsg={errors?.nickname?.message}>
        <Input.Label label="닉네임" caption="(닉네임 중복 불가, 최대 10자)" />
        <Input.Field {...register("nickname")} placeholder="닉네임을 입력해주세요." />
        <Input.Error />
      </Input>

      <Input id="password" errorMsg={errors?.password?.message}>
        <Input.Label label="비밀번호" caption="(영문, 숫자, 특수문자[!@#$%^&*] 포함 8~30자)" />
        <Input.Password {...register("password")} placeholder="비밀번호를 입력해주세요." />
        <Input.Error />
      </Input>

      <AuthField
        id="passwordConfirmation"
        label="비밀번호 확인"
        errorMsg={errors?.passwordConfirmation?.message}
      >
        <Input.Password
          {...register("passwordConfirmation")}
          placeholder="비밀번호를 확인을 입력해주세요."
        />
      </AuthField>

      <Button type="submit" className="mt-4" disabled={!allFilled}>
        회원가입
      </Button>
    </>
  );
}
export function SignInFormFields() {
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

      <button type="button" className="w-full text-right text-base text-pink-400 underline">
        비밀번호를 잊으셨나요?
      </button>

      <Button type="submit" className="mt-4" disabled={!allFilled}>
        로그인
      </Button>
    </>
  );
}
