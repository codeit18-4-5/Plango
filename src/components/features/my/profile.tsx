"use client";

import { Avatar, Button, Form, Input, Modal } from "@/components/ui";
import { changePasswordSchema, ChangePasswordSchema, ChangeProfileSchema } from "@/lib/schema";
import { Controller, useFormContext } from "react-hook-form";
import IcLeave from "@/assets/icons/ic-leave.svg";
import IcEdit from "@/assets/icons/ic-pencil-border.svg";
import IcCancel from "@/assets/icons/ic-cancel-border.svg";
import deleteUser from "@/api/user/delete-user";
import { useImageUpload, useLogout } from "@/hooks";
import { useAlert, ALERT_TYPE } from "@/providers/alert-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import patchPassword from "@/api/user/patch-password";
import { FILE_ACCEPT } from "@/constants/file_policy";
import cn from "@/lib/cn";
import postImagesUpload from "@/api/image/post-images-upload";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

type ProfileFieldProps = {
  id: string;
  label: string;
  errorMsg?: string;
  caption?: string;
  children: React.ReactNode;
};
type PasswordChangeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
type ImgUploadProps = {
  value: string | null;
  onChange: (file: File | string | null) => void;
};

// 유저 프로필 수정 field
function ProfileField({ id, label, errorMsg, caption, children }: ProfileFieldProps) {
  return (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} caption={caption} />
      {children}
      <Input.Error />
    </Input>
  );
}

// 유저 이미지 수정
function ProfileImage({ value, onChange }: ImgUploadProps) {
  const { preview, error, handleFile, clearPreview } = useImageUpload();
  const user = useAuthStore.getState().user;
  const [defaultImg, setDefaultImg] = useState(user?.image);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = handleFile(file);
    if (!isValid) return;
    e.target.value = "";
    setDefaultImg(null);

    try {
      const res = await postImagesUpload({ url: file });
      onChange(res.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageDelete = () => {
    clearPreview();
    onChange(null);
    setDefaultImg(user?.image);
  };

  const previewImage = defaultImg ?? preview?.image ?? value;
  return (
    <div className="relative">
      <label
        htmlFor="profileImage"
        aria-label="프로필 이미지"
        className="group relative inline-block cursor-pointer"
      >
        <input
          id="profileImage"
          name="image"
          type="file"
          accept={FILE_ACCEPT}
          className="hidden"
          onChange={handleImageUpload}
        />
        <Avatar
          alt="프로필 이미지"
          image={previewImage}
          className={cn("h-20 w-20", "border-pink-500 group-hover:border-2")}
        />
        {!preview && <IcEdit className="absolute bottom-0 right-0 h-8 w-8" />}
      </label>
      {preview && (
        <button type="button" onClick={handleImageDelete}>
          <IcCancel className="z-1 absolute left-12 top-14 h-8 w-8" />
        </button>
      )}
      <p className="pt-2 text-xs text-gray-500">* 이미지 파일 최대 용량은 5MB 입니다.</p>
      {error && <p className="mt-2 text-caption text-red-400">{error}</p>}
    </div>
  );
}
export function ProfileUpdateFormField({
  email,
  onModalOpen,
}: {
  image?: string;
  email: string;
  onModalOpen: () => void;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ChangeProfileSchema>();
  return (
    <>
      <Controller
        control={control}
        name="image"
        render={({ field: { value, onChange } }) => (
          <ProfileImage
            value={typeof value === "string" ? value : null}
            onChange={v => onChange(v)}
          />
        )}
      />

      <ProfileField
        id="nickname"
        errorMsg={errors?.nickname?.message}
        label="닉네임"
        caption="(닉네임 중복 불가, 최대 10자)"
      >
        <Input.Field {...register("nickname")} placeholder="닉네임을 입력해주세요." />
      </ProfileField>

      <ProfileField id="email" label="이메일">
        <Input.Field value={email} disabled />
      </ProfileField>

      <ProfileField id="password" label="비밀번호">
        <div className="relative">
          <Input.Field value="● ● ● ● ● ● ● ●" disabled />
          <Button
            type="button"
            size="sm"
            intent="secondary"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={onModalOpen}
          >
            변경하기
          </Button>
        </div>
      </ProfileField>
    </>
  );
}

//  비밀번호 변경
function PasswordFormFields({ onClose }: { onClose: () => void }) {
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
        <Button type="submit" className="flex-1" disabled={!allFilled}>
          변경하기
        </Button>
      </div>
    </>
  );
}
export function PasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  const handleSubmit = async (data: ChangePasswordSchema) => {
    try {
      await patchPassword(data);
      // @TODO toast
      alert("변경되었습니다.");
      onClose();
    } catch (err) {
      console.error(err);
    }
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
        <PasswordFormFields onClose={onClose} />
      </Form>
    </Modal>
  );
}

//  회원 탈퇴
export function UserDelete() {
  const logout = useLogout();
  const { showAlert } = useAlert();

  const handleConfirm = async () => {
    const confirmed = await showAlert({ type: ALERT_TYPE.Leave });
    if (!confirmed) return;
    await handleDelete();
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
    } finally {
      logout();
    }
  };

  return (
    <button onClick={handleConfirm} className="flex gap-2 text-base text-red-400">
      <IcLeave className="h-6 w-6" /> 회원 탈퇴하기
    </button>
  );
}
