import { useState, useEffect } from "react";

type UseEditableReturn = {
  isEditing: boolean;
  editedContent: string;
  startEditing: () => void;
  cancelEditing: () => void;
  saveEditing: () => void;
  isSaveDisabled: boolean;
  setEditedContent: (value: string) => void;
};

type UseEditableOptions = {
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
};

/**
 * 작성글 수정 상태 관리 훅
 * @author yeonsu
 * @param initialValue 초기 작성글 값
 * @param options 추가 옵션 (textareaRef 등)
 */
const useEditable = (initialValue: string, options?: UseEditableOptions): UseEditableReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(initialValue);

  useEffect(() => {
    if (isEditing && options?.textareaRef?.current) {
      const textarea = options.textareaRef.current;
      textarea.focus();

      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [isEditing, options?.textareaRef]);

  const startEditing = () => {
    setIsEditing(true);
  };
  const cancelEditing = () => {
    setIsEditing(false);
    setEditedContent(initialValue);
  };

  const saveEditing = () => {
    if (!editedContent.trim()) {
      return;
    }
    setIsEditing(false);
  };

  const isSaveDisabled = editedContent.trim().length === 0;

  return {
    isEditing,
    editedContent,
    startEditing,
    cancelEditing,
    saveEditing,
    isSaveDisabled,
    setEditedContent,
  };
};

export default useEditable;
