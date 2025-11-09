"use client";

import { useRef } from "react";
import { useImageUpload } from "@/hooks";
import Image from "next/image";
import IcCancel from "@/assets/icons/ic-cancel.svg";

export default function ImgUpload() {
  const { preview, error, handleFile, removeImage } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file, () => {
        if (inputRef.current) inputRef.current.value = "";
      });
    }
  };

  return (
    <div>
      <div>
        {!preview ? (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onChange}
            aria-label="이미지 업로드"
          />
        ) : (
          <>
            <Image src={preview.image} alt={preview.name} fill />
            <button type="button" onClick={removeImage} aria-label="업로드한 이미지 삭제">
              <IcCancel />
            </button>
          </>
        )}
      </div>
      {error && <span>{error}</span>}
    </div>
  );
}
