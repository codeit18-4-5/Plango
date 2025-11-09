"use client";

import cn from "@/lib/cn";
import { useId, useState } from "react";
import { CreateArticleComment } from "@/types/article-comment";
import { useAutoResizeTextarea } from "@/hooks";
import { replyInputWrapper, replyInputTextarea, replyInputSubmit } from "./reply-input.styles";
import { Button } from "@/components/ui";
import IcSubmit from "@/assets/icons/ic-enter.svg";

type ReplyProps = {
  comment: CreateArticleComment;
  variant?: "primary" | "secondary";
};

export default function Reply({ variant = "primary" }: ReplyProps) {
  const [comment, setComment] = useState("");
  const isFilled = comment.trim().length > 0;
  const textareaId = useId();

  const { textareaRef, onChange } = useAutoResizeTextarea();

  return (
    <div className={replyInputWrapper({ variant })}>
      <textarea
        id={textareaId}
        ref={textareaRef}
        className={cn("max-h-[18.75rem]", replyInputTextarea({ variant }))}
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={e => onChange(e, setComment)}
      />

      {variant === "primary" && (
        <Button size="sm" className={replyInputSubmit({ variant })} disabled={!isFilled}>
          등록
        </Button>
      )}
      {variant === "secondary" && (
        <Button
          size="icon"
          aria-label="등록"
          disabled={!isFilled}
          className={cn(replyInputSubmit({ variant }), !isFilled && "text-gray-400")}
        >
          <IcSubmit />
        </Button>
      )}
    </div>
  );
}
