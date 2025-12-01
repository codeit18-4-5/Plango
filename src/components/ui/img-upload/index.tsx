"use client";

import { useImageUpload, useFileDrop } from "@/hooks";
import { IMG_UPLOAD_STYLES } from "./index.styles";
import Image from "next/image";
import IcCancel from "@/assets/icons/ic-cancel.svg";
import IcPlus from "@/assets/icons/ic-plus.svg";

/**
 * 이미지 업로드 컴포넌트
 * 파일 선택 시 onChange로 file 객체 전달, 삭제 시 null 전달
 * value로 기존 이미지 URL 전달
 * @author yeonsu
 */

export type ImgUploadProps = {
  value?: string | null;
  onChange: (file: File | string | null) => void;
  id: string;
  error?: string;
};

export default function ImgUpload({ value, onChange, id, error }: ImgUploadProps) {
  const { preview, error: uploadError, handleFile, clearPreview } = useImageUpload();

  const handleUploadAndChange = (file: File) => {
    const isValid = handleFile(file);
    if (!isValid) {
      onChange(null);
      return;
    }
    onChange(file);
  };

  const handleFileInput = (file: File | undefined) => {
    if (file) handleUploadAndChange(file);
  };

  const onFilesDrop = (files: File[]) => {
    handleFileInput(files[0]);
  };

  const { isDragActive, onDragOver, onDragLeave, onDrop } = useFileDrop({
    onFiles: onFilesDrop,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileInput(e.target.files?.[0]);
    e.target.value = "";
  };

  const clearAll = () => {
    clearPreview();
    onChange(null);
  };

  const showPreview = preview?.image || value;
  const previewUrl = preview?.image || (typeof value === "string" ? value : "");
  const previewName = preview?.name || "첨부 이미지";

  return (
    <>
      <div
        className={IMG_UPLOAD_STYLES.wrapper(!showPreview, !!error, isDragActive)}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          id={id}
          name={id}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
          onChange={onInputChange}
          className={IMG_UPLOAD_STYLES.input}
        />
        {!showPreview ? (
          <label htmlFor={id} className={IMG_UPLOAD_STYLES.label(isDragActive)}>
            <IcPlus className={IMG_UPLOAD_STYLES.icon.plus(isDragActive)} />
            <span className="text-center">
              {isDragActive ? (
                "이미지를 여기에 드롭하세요."
              ) : (
                <>
                  여기로 이미지를 드래그하거나 <br /> 클릭해서 업로드하세요.
                </>
              )}
            </span>
          </label>
        ) : (
          <>
            <Image
              src={previewUrl}
              alt={previewName}
              fill
              className={IMG_UPLOAD_STYLES.image}
              priority
              sizes="100%"
            />
            <button
              type="button"
              onClick={clearAll}
              aria-label="등록 이미지 삭제"
              className={IMG_UPLOAD_STYLES.button}
            >
              <IcCancel className={IMG_UPLOAD_STYLES.icon.cancel} />
            </button>
          </>
        )}
      </div>
      {(uploadError || error) && (
        <span className={IMG_UPLOAD_STYLES.errorMsg} role="alert">
          {uploadError || error}
        </span>
      )}
    </>
  );
}
