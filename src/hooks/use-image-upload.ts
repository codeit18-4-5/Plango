"use client";

import { useState } from "react";
import { FILE_POLICY } from "@/constants/file_policy";

interface ImagePreview {
  id: string;
  image: string;
  name: string;
  type: string;
}

interface UseImageUploadOptions {
  maxImageSizeMB?: number;
  onError?: (msg: string) => void;
}

const useImageUpload = ({
  maxImageSizeMB = FILE_POLICY.MAX_IMAGE_SIZE_MB,
  onError,
}: UseImageUploadOptions = {}) => {
  const [preview, setPreview] = useState<ImagePreview | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MAX_SIZE = maxImageSizeMB * 1024 * 1024;

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      const msg = "이미지 파일만 업로드 가능합니다.";
      setError(msg);
      onError?.(msg);

      return false;
    }
    if (file.size > MAX_SIZE) {
      const msg = `파일 크기는 ${maxImageSizeMB}MB를 초과할 수 없습니다.`;
      setError(msg);
      onError?.(msg);

      return false;
    }

    setError(null);

    return true;
  };

  const handleFile = (file: File, resetInput?: () => void) => {
    if (!validateFile(file)) {
      resetInput?.();
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreview({
        id: crypto.randomUUID(),
        image: reader.result as string,
        name: file.name,
        type: file.type,
      });
    };

    reader.readAsDataURL(file);

    setError(null);

    resetInput?.();
  };

  const removeImage = () => {
    setPreview(null);
  };

  return {
    preview,
    error,
    handleFile,
    removeImage,
  };
};

export default useImageUpload;
