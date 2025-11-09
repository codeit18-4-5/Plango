"use client";

import { useRef, useId } from "react";
import { useImageUpload, useFileDrop } from "@/hooks";
import { IMG_UPLOAD_STYLES } from "./index.styles";
import Image from "next/image";
import IcCancel from "@/assets/icons/ic-cancel.svg";
import IcPlus from "@/assets/icons/ic-plus.svg";

export default function ImgUpload() {
  const { preview, error, handleFile, removeImage } = useImageUpload();
  const { onDragOver, onDragLeave, onDrop } = useFileDrop({
    onFiles: files => handleFile(files[0]),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file, () => {
        if (inputRef.current) inputRef.current.value = "";
      });
    }
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
        {!preview ? (
          <>
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept="image/*"
              onChange={onChange}
              className={IMG_UPLOAD_STYLES.input}
            />
            <label htmlFor={inputId} className={IMG_UPLOAD_STYLES.label}>
              <IcPlus className={IMG_UPLOAD_STYLES.icon.plus} />
              <span>이미지 등록</span>
            </label>
          </>
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
              onClick={removeImage}
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
