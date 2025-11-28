"use client";

import cn from "@/lib/cn";
import { useId, useEffect } from "react";
import { useAutoResizeTextarea } from "@/hooks";
import { replyInputWrapper, replyInputTextarea, replyInputSubmit } from "./reply-input.styles";
import { Button, Input } from "@/components/ui";
import IcSubmit from "@/assets/icons/ic-enter.svg";

type ReplyInputProps = {
  variant?: "primary" | "secondary";
  value: string;
  onChange: (comment: string) => void;
  isLoggedIn?: boolean;
  isPending?: boolean;
  onRequireLogin?: () => void;
};

export default function ReplyInput({
  variant = "primary",
  value,
  onChange,
  isLoggedIn = true,
  isPending = false,
  onRequireLogin,
}: ReplyInputProps) {
  const isFilled = value.trim().length > 0;
  const textareaId = useId();
  const { textareaRef, onChange: autoResizeChange } = useAutoResizeTextarea();

  useEffect(() => {
    if (value === "" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, textareaRef]);

  const handleFocusOrInput = (
    e: React.FocusEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!isLoggedIn) {
      e.preventDefault();
      if (onRequireLogin) onRequireLogin();
      return;
    }
  };

  return (
    <div className={replyInputWrapper({ variant })}>
      <Input.Field
        as="textarea"
        id={textareaId}
        ref={textareaRef}
        className={cn("max-h-[18.75rem]", replyInputTextarea({ variant }))}
        placeholder="댓글을 입력해주세요"
        value={value}
        onFocus={handleFocusOrInput}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (!isLoggedIn) {
            handleFocusOrInput(e);
            return;
          }
          autoResizeChange(e, onChange);
        }}
        readOnly={!isLoggedIn}
      />
      {variant === "primary" && (
        <Button
          size="sm"
          type="submit"
          className={replyInputSubmit({ variant })}
          disabled={!isFilled || !isLoggedIn || isPending}
        >
          {isPending ? "등록 중..." : "등록"}
        </Button>
      )}
      {variant === "secondary" && (
        <Button
          size="icon"
          type="submit"
          aria-label="등록"
          disabled={!isFilled || !isLoggedIn || isPending}
          className={cn(
            replyInputSubmit({ variant }),
            (!isFilled || !isLoggedIn || isPending) && "text-gray-400",
          )}
        >
          <IcSubmit />
        </Button>
      )}
    </div>
  );
}
