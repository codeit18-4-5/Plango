import { useState } from "react";

type UseEditableReturn = {
  isEditing: boolean;
  editedContent: string;
  startEditing: () => void;
  cancelEditing: () => void;
  saveEditing: () => void;
  isSaveDisabled: boolean;
  setEditedContent: (value: string) => void;
};

/**
 * 작성글 수정 상태 관리 훅
 * @author yeonsu
 * @param initialValue 초기 작성글 값
 */
const useEditable = (initialValue: string): UseEditableReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(initialValue);

  const startEditing = () => setIsEditing(true);

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
