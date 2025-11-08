import { useRef, useEffect, ChangeEvent, useCallback } from "react";

type UseAutoResizeTextareaReturn = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, callback?: (value: string) => void) => void;
  resize: () => void;
};

/**
 * 글 작성 시 textarea 높이 자동 조절 훅
 */
const useAutoResizeTextarea = (): UseAutoResizeTextareaReturn => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>, callback?: (value: string) => void) => {
    if (textareaRef.current) {
      resize();
    }
    if (callback) {
      callback(e.target.value);
    }
  };

  useEffect(() => {
    resize();
  }, [resize]);

  return { textareaRef, onChange, resize };
};

export default useAutoResizeTextarea;
