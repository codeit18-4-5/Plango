"use client";

import { Avatar, Button, Input } from "@/components/ui";
import { ChangeProfileSchema } from "@/lib/schema";
import { Controller, useFormContext } from "react-hook-form";
import IcEdit from "@/assets/icons/ic-pencil-border.svg";
import IcCancel from "@/assets/icons/ic-cancel-border.svg";
import { useImageUpload } from "@/hooks";
import { FILE_ACCEPT } from "@/constants/file_policy";
import cn from "@/lib/cn";
import postImagesUpload from "@/api/image/post-images-upload";
import { useAuthStore } from "@/store/auth.store";
import { ReactNode, useState } from "react";
import { useToast } from "@/providers/toast-provider";
import { devConsoleError } from "@/lib/error";

type ProfileFieldProps = {
  id: string;
  label: string;
  errorMsg?: string;
  caption?: string;
  children: React.ReactNode;
};

type ImgUploadProps = {
  value: string | null;
  onChange: (file: File | string | null) => void;
};

// 유저 프로필 수정 field
export function ProfileField({ id, label, errorMsg, caption, children }: ProfileFieldProps) {
  const {
    formState: { touchedFields },
  } = useFormContext();

  const isTouched = !!touchedFields[id as keyof typeof touchedFields];

  return (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} caption={caption} />
      {children}
      {isTouched && <Input.Error />}
    </Input>
  );
}

// 유저 이미지 수정
function ProfileImage({ value, onChange }: ImgUploadProps) {
  const { preview, error, handleFile, clearPreview } = useImageUpload();
  const user = useAuthStore.getState().user;
  const [defaultImg, setDefaultImg] = useState(user?.image);
  const { showToast } = useToast();

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
    } catch (err) {
      devConsoleError(err);
      showToast("이미지 업로드에 실패했습니다.\n 잠시 후 다시 시도해주세요", "error");
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

// 유저 프로필 수정
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

  const isKakaoUser = email?.toLowerCase().endsWith("@kakao.com");
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
        <Input.Field
          {...register("nickname")}
          placeholder="닉네임을 입력해주세요."
          maxLength={10}
        />
      </ProfileField>

      <ProfileField id="email" label="이메일">
        <Input.Field value={email} disabled />
      </ProfileField>
      {!isKakaoUser && (
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
      )}
    </>
  );
}

export function ProfileEmpty({ msg, children }: { msg: string; children?: ReactNode }) {
  return (
    <div className="flex-1 content-center justify-items-center text-center">
      <p className="text-base text-gray-500">{msg}</p>
      {children}
    </div>
  );
}
