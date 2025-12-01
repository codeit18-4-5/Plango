"use client";

import { addTaskListStyle } from "@/app/(routes)/team/[id]/tasklist/index.styles";
import { Form, Input, Modal } from "@/components/ui";
import { taskSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

interface TaskAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: z4.infer<typeof taskSchema>) => Promise<void>;
  isPending: boolean;
}

export default function TaskAddTemplate({ isOpen, onClose, onSubmit, isPending }: TaskAddProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: SubmitHandler<z4.infer<typeof taskSchema>> = async data => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form
        onSubmit={handleSubmit}
        resolver={zodResolver(taskSchema)}
        defaultValues={{ name: "" }}
        mode="onSubmit"
        className="gap-[0]"
      >
        <Modal.HeaderWithClose title="새로운 목록 추가" />
        <div className={addTaskListStyle}>
          <FormField />
          <Modal.FooterWithOnlyConfirm
            confirmButtonTitle="만들기"
            isSubmit
            disabled={isPending || isSubmitting}
          />
        </div>
      </Form>
    </Modal>
  );
}

function FormField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<z4.infer<typeof taskSchema>>();

  return (
    <Modal.Body>
      <div className="mb-[10px] w-full text-center">
        <span className="text-body-s text-gray-300">
          할 일에 대한 목록을 추가하고
          <br />
          목록별 할 일을 만들 수 있습니다.
        </span>
      </div>

      <div className="pb-[20px]">
        <Input errorMsg={errors.name && errors.name.message}>
          <Input.Label label="목록 이름" caption="(최대30자)" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <Input.Field
                  {...field}
                  maxLength="30"
                  as="input"
                  placeholder="목록 이름을 입력해주세요"
                  value={field.value || ""}
                />
                <Input.Error />
              </>
            )}
          />
        </Input>
      </div>
    </Modal.Body>
  );
}
