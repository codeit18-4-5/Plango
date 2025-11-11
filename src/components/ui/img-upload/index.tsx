"use client";

import { useRef, useId } from "react";
import { useImageUpload, useFileDrop } from "@/hooks";
import { IMG_UPLOAD_STYLES } from "./index.styles";
import Image from "next/image";
import IcCancel from "@/assets/icons/ic-cancel.svg";
import IcPlus from "@/assets/icons/ic-plus.svg";

/**
 * 이미지 업로드 컴포넌트
 * 미리보기, 드래그앤드롭, 파일 선택
 * @author yeonsu
 */

export default function ImgUpload() {
  const { preview, error, handleFile, clearPreview } = useImageUpload();
  const { onDragOver, onDragLeave, onDrop } = useFileDrop({
    onFiles: files => handleFile(files[0]),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFile(file);
    e.target.value = "";
  };

  const inputId = useId();

  return (
    <>
      <div
        className={IMG_UPLOAD_STYLES.wrapper(!preview, !!error)}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          onChange={onChange}
          className={IMG_UPLOAD_STYLES.input}
        />
        {!preview ? (
          <label htmlFor={inputId} className={IMG_UPLOAD_STYLES.label}>
            <IcPlus className={IMG_UPLOAD_STYLES.icon.plus} />
            <span>이미지 등록</span>
          </label>
        ) : (
          <>
            <Image
              src={preview.image}
              alt={preview.name}
              fill
              className={IMG_UPLOAD_STYLES.image}
            />
            <button
              type="button"
              onClick={clearPreview}
              aria-label="등록 이미지 삭제"
              className={IMG_UPLOAD_STYLES.button}
            >
              <IcCancel className={IMG_UPLOAD_STYLES.icon.cancel} />
            </button>
          </>
        )}
      </div>
      {error && (
        <span className={IMG_UPLOAD_STYLES.errorMsg} role="alert">
          {error}
        </span>
      )}
    </>
  );
}
