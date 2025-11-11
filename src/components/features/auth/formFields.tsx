"use client";

import { Button, Input } from "@/components/ui";
import { SignInSchema, SignUpSchema } from "@/constants/schema";
import { useFormContext } from "react-hook-form";

export function SignUpFormFields() {
  const {
    register,
    formState: { errors, isValid, isDirty },
  } = useFormContext<SignUpSchema>();

  return (
    <>
      <Input errorMsg={errors.userName?.message}>
        <Input.Label label="이름" />
        <Input.Field {...register("userName")} placeholder="이름을 입력해주세요." />
        <Input.Error />
      </Input>
      <Input id="email" errorMsg={errors.userEmail?.message}>
        <Input.Label label="이메일" />
        <Input.Field type="email" {...register("userEmail")} placeholder="이메일을 입력해주세요." />
        <Input.Error />
      </Input>
      <Input id="password" errorMsg={errors?.password?.message}>
        <Input.Label label="비밀번호" />
        <Input.Password {...register("password")} placeholder="비밀번호를 입력해주세요." />
        <Input.Error />
      </Input>
      <Input id="passwordConfirm" errorMsg={errors?.passwordConfirm?.message}>
        <Input.Label label="비밀번호 확인" />
        <Input.Password
          {...register("passwordConfirm")}
          placeholder="비밀번호를 확인을 입력해주세요."
        />
        <Input.Error />
      </Input>
      <Button type="submit" className="mt-4" disabled={!isValid && !isDirty}>
        회원가입
      </Button>
    </>
  );
}
export function SignInFormFields() {
  const {
    register,
    formState: { errors, isValid, isDirty },
  } = useFormContext<SignInSchema>();

  return (
    <>
      <Input id="email" errorMsg={errors.userEmail?.message}>
        <Input.Label label="이메일" />
        <Input.Field type="email" {...register("userEmail")} placeholder="이메일을 입력해주세요." />
        <Input.Error />
      </Input>
      <Input id="password" errorMsg={errors?.password?.message}>
        <Input.Label label="비밀번호" />
        <Input.Password {...register("password")} placeholder="비밀번호를 입력해주세요." />
        <Input.Error />
      </Input>
      <button type="button" className="w-full text-right text-base text-pink-400 underline">
        비밀번호를 잊으셨나요?
      </button>
      <Button type="submit" className="mt-4" disabled={!isValid && !isDirty}>
        로그인
      </Button>
    </>
  );
}
