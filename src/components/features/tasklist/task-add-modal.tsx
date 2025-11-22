"use client";

import { addTaskListStyle } from "@/app/(routes)/team/[id]/tasklist/index.styles";
import { Input, Modal } from "@/components/ui";
import { ChangeEvent, useState } from "react";

interface TaskAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export default function TaskAddTemplate({ isOpen, onClose, onSubmit }: TaskAddProps) {
  const [taskName, setTaskName] = useState("");

  const handleMakeClick = () => {
    onSubmit(taskName);
    setTaskName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.HeaderWithClose title="새로운 목록 추가" />
      <div className={addTaskListStyle}>
        <Modal.Body>
          <div className="mb-[10px] w-full text-center">
            <span className="text-body-s text-gray-300">
              할 일에 대한 목록을 추가하고
              <br />
              목록별 할 일을 만들 수 있습니다.
            </span>
          </div>
          <Input>
            <Input.Label label="목록 이름" />
            <Input.Field
              maxLength="30"
              as="input"
              placeholder="목록 이름을 입력해주세요. (30자 제한)"
              value={taskName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
              className="mb-[24px]"
            />
          </Input>
        </Modal.Body>
        <Modal.FooterWithOnlyConfirm confirmButtonTitle="만들기" onConfirm={handleMakeClick} />
      </div>
    </Modal>
  );
}
