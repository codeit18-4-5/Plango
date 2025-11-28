"use client";

import { Input, Modal } from "@/components/ui";
import cn from "@/lib/cn";
import { DeleteType } from "@/types/task";
import { useState } from "react";

interface TaskDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (type: DeleteType) => Promise<void>;
  isPending: boolean;
}

export default function TaskDeleteSheet({ isOpen, onClose, onDelete, isPending }: TaskDeleteProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteType, setDeleteType] = useState<DeleteType>("One");

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await onDelete(deleteType);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.HeaderWithClose title="할 일 삭제" />
      <Modal.Body>
        <div className="mb-[10px] w-full text-center">
          <span className="text-body-s text-gray-300">
            '반복일정 모두 삭제' 선택 시<br /> 해당 반복일정이 전부 삭제됩니다.
          </span>
          <br />
          <span className="text-body-m text-pink-500">삭제 된 할 일은 복구 할 수 없습니다.</span>
        </div>
        <div className="ml-[50px]">
          <Input>
            <Input.Label
              className={cn(deleteType === "One" && "text-pink-400", "mb-[5px] text-body-m")}
            >
              <Input.Field
                type="radio"
                name="delete"
                value="One"
                checked={deleteType === "One"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeleteType(e.target.value as DeleteType)
                }
                style={{ display: "inline-block", accentColor: "var(--pink-400)" }}
                className="mr-[5px] w-[25px]"
              />
              현재 할 일 삭제
            </Input.Label>
            <Input.Label className={cn(deleteType === "All" && "text-pink-400", "text-body-m")}>
              <Input.Field
                type="radio"
                name="delete"
                value="All"
                checked={deleteType === "All"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeleteType(e.target.value as DeleteType)
                }
                style={{ display: "inline-block", accentColor: "var(--pink-400)" }}
                className="mr-[5px] w-[25px]"
              />
              반복일정 모두 삭제
            </Input.Label>
          </Input>
        </div>
      </Modal.Body>
      <Modal.FooterWithButtons
        confirmButtonTitle="확인"
        onConfirm={handleSubmit}
        disabled={isPending || isSubmitting}
      />
    </Modal>
  );
}
