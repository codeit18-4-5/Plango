import { useState, useCallback } from "react";

interface UseFileDropOptions {
  onFiles: (files: File[]) => void;
}

/**
 * 파일 드롭 훅
 * 드래그 상태 및 이벤트 핸들러 관리
 * @author yeonsu
 * @param onFiles 드롭된 파일들
 */

const useFileDrop = ({ onFiles }: UseFileDropOptions) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFiles(Array.from(e.dataTransfer.files));
      }
    },
    [onFiles],
  );

  return { isDragActive, onDragOver, onDragLeave, onDrop };
};

export default useFileDrop;
