"use client";

import { addTaskListStyle } from "@/app/(routes)/team/[id]/tasklist/index.styles";
import { Form, Input, Modal } from "@/components/ui";
import { taskDetailUpdateSchema } from "@/lib/schema";
import { extractChangedFields } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

interface TaskUpdateProps {
  name: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: z4.infer<ReturnType<typeof taskDetailUpdateSchema>>) => Promise<void>;
  type: FormFieldType;
  isPending: boolean;
}

type FormFieldType = "nameOnly" | "nameAndDescription";

export default function TaskDetailUpdateTemplate({
  name,
  description,
  isOpen,
  onClose,
  onSubmit,
  type,
  isPending,
}: TaskUpdateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: SubmitHandler<
    z4.infer<ReturnType<typeof taskDetailUpdateSchema>>
  > = async data => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const changedFields = extractChangedFields(data, name, description);

    try {
      await onSubmit(changedFields);
    } finally {
      setIsSubmitting(false);
    }
  };

  const schema =
    type === "nameOnly" ? taskDetailUpdateSchema(name) : taskDetailUpdateSchema(name, description);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form
        onSubmit={handleSubmit}
        resolver={zodResolver(schema)}
        defaultValues={{ name: name, description: description }}
        mode="onSubmit"
        className="gap-[0]"
      >
        <Modal.HeaderWithClose title="할 일 수정" />
        <div className={addTaskListStyle}>
          <FormField type={type} />
          <Modal.FooterWithOnlyConfirm
            confirmButtonTitle="수정"
            isSubmit
            disabled={isPending || isSubmitting}
          />
        </div>
      </Form>
    </Modal>
  );
}

function FormField({ type }: { type: FormFieldType }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<z4.infer<ReturnType<typeof taskDetailUpdateSchema>>>();

  return (
    <Modal.Body>
      <div className="pb-[20px]">
        <Input errorMsg={errors.name && errors.name.message}>
          <Input.Label label="할 일 제목" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <Input.Field
                  {...field}
                  maxLength="30"
                  as="input"
                  placeholder="할 일 제목을 입력해주세요.(최대30자)"
                  value={field.value || ""}
                />
                <Input.Error />
              </>
            )}
          />
        </Input>
        {type !== "nameOnly" && (
          <Input errorMsg={errors.description && errors.description.message}>
            <Input.Label label="할 일 메모" />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <Input.Field
                    {...field}
                    maxLength="255"
                    as="textarea"
                    placeholder="메모를 입력해주세요.(최대255자)"
                    value={field.value || ""}
                  />
                  <Input.Error />
                </>
              )}
            />
          </Input>
        )}
      </div>
    </Modal.Body>
  );
}
