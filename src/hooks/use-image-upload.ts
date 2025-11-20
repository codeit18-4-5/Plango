"use client";

import { useState } from "react";
import { FILE_POLICY } from "@/constants/file_policy";

interface ImagePreview {
  image: string;
  name: string;
  type: string;
}

interface UseImageUploadOptions {
  maxImageSizeMB?: number;
  onError?: (msg: string) => void;
}

/** 이미지 업로드 훅
 * 미리보기(생성/제거), 파일 처리, 파일 유효성 검사
 * @author yeonsu
 * @param maxImageSizeMB 최대 이미지 파일 크기 (MB)
 * @param onError
 */

const useImageUpload = ({
  maxImageSizeMB = FILE_POLICY.MAX_IMAGE_SIZE_MB,
  onError,
}: UseImageUploadOptions = {}) => {
  const [preview, setPreview] = useState<ImagePreview | null>(null);
  const [error, setError] = useState<string | null>(null);

  const maxSize = maxImageSizeMB * 1024 * 1024;

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      const msg = "이미지 파일만 업로드 가능합니다.";
      setError(msg);
      onError?.(msg);

      return false;
    }
    if (file.size > maxSize) {
      const msg = `파일 크기는 ${maxImageSizeMB}MB를 초과할 수 없습니다.`;
      setError(msg);
      onError?.(msg);

      return false;
    }

    setError(null);

    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) {
      setPreview(null);
      return false;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreview({
        image: reader.result as string,
        name: file.name,
        type: file.type,
      });
    };

    reader.readAsDataURL(file);
    return true;
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return {
    preview,
    error,
    handleFile,
    clearPreview,
  };
};

export default useImageUpload;
