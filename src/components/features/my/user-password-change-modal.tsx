"use client";

import { Button, Form, Input, Modal } from "@/components/ui";
import { changePasswordSchema, ChangePasswordSchema } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileField } from "./user-profile";
import { usePasswordChange } from "@/hooks/user/use-userQuery";

type PasswordChangeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function PasswordFormFields({ onClose, isPending }: { onClose: () => void; isPending: boolean }) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ChangePasswordSchema>();

  const [password, passwordConfirmation] = watch(["password", "passwordConfirmation"]);
  const allFilled = !!password?.toString().trim() && !!passwordConfirmation?.toString().trim();

  return (
    <>
      <ProfileField
        id="password"
        errorMsg={errors?.password?.message}
        label="새 비밀번호"
        caption="(영문, 숫자, 특수문자[!@#$%^&*] 포함 8~30자)"
      >
        <Input.Password {...register("password")} placeholder="비밀번호를 입력해주세요." />
      </ProfileField>

      <ProfileField
        id="passwordConfirmation"
        errorMsg={errors?.passwordConfirmation?.message}
        label="새 비밀번호 확인"
      >
        <Input.Password
          {...register("passwordConfirmation")}
          placeholder="비밀번호를 확인을 입력해주세요."
        />
      </ProfileField>

      <div className="flex flex-nowrap gap-2 pb-6">
        <Button type="button" intent="secondary" className="flex-1" onClick={onClose}>
          취소
        </Button>
        <Button type="submit" className="flex-1" disabled={!allFilled || isPending}>
          변경하기
        </Button>
      </div>
    </>
  );
}

export function UserPasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  const { mutate, isPending } = usePasswordChange(onClose);

  const handleSubmit = async (data: ChangePasswordSchema) => {
    mutate(data);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="mb-6 text-center text-base">비밀번호 재설정</p>
      <Form<ChangePasswordSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
        mode="onBlur"
        reValidateMode="onChange"
        className="px-2"
      >
        <PasswordFormFields onClose={onClose} isPending={isPending} />
      </Form>
    </Modal>
  );
}
