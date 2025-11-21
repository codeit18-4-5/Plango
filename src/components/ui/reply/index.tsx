"use client";

import cn from "@/lib/cn";
import { useEffect } from "react";
import { CommentBase } from "@/types/comment-base";
import { ReplyAction } from "@/types/action";
import ReplyActions from "./reply-actions";
import { useEditable, useAutoResizeTextarea } from "@/hooks";
import { replyWrapper, replyInner, replyTextarea, replyInfo, replyTimeStamp } from "./index.styles";
import { Avatar, Button } from "@/components/ui";
import { getTimeAgo, formatDateToKorean } from "@/lib/utils";

type ReplyProps = {
  comment: CommentBase;
  isEditing: boolean;
  onCancelEdit: () => void;
  onSaveEdit: (value: string) => void;
  isAuthor: boolean;
  variant?: "primary" | "secondary";
  actions?: ReplyAction[];
};

export default function Reply({
  comment,
  isEditing,
  onCancelEdit,
  onSaveEdit,
  isAuthor,
  variant = "primary",
  actions = [],
}: ReplyProps) {
  const { textareaRef, onChange, resize } = useAutoResizeTextarea();

  const { editedContent, setEditedContent } = useEditable(comment.content, { textareaRef });

  useEffect(() => {
    if (isEditing) {
      resize();

      if (textareaRef.current) {
        const textarea = textareaRef.current;
        const length = textarea.value.length;

        textarea.focus();

        textarea.setSelectionRange(length, length);
      }
    }
  }, [isEditing, resize, textareaRef]);

  const isSaveDisabled = editedContent.trim().length === 0;

  return (
    <div className={replyWrapper({ variant })}>
      <div className={replyInner({ variant })}>
        {isEditing ? (
          <>
            <textarea
              ref={textareaRef}
              className={cn("max-h-[18.75rem]", replyTextarea({ variant }))}
              id={`comment-${comment.id}`}
              value={editedContent.replace(/\\n/g, "\n")}
              placeholder="수정할 댓글을 입력해주세요"
              onChange={e => {
                setEditedContent(e.target.value);
                onChange(e);
              }}
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={onCancelEdit}
                size="sm"
                intent="cancel"
                className={cn(
                  "border-0 bg-transparent",
                  "duration-200 hover:bg-transparent hover:text-gray-400 active:text-gray-300",
                )}
              >
                취소
              </Button>
              <Button
                onClick={() => {
                  if (!isSaveDisabled) onSaveEdit(editedContent);
                }}
                disabled={isSaveDisabled}
                size="sm"
                intent="tertiary"
                className="duration-200"
              >
                수정하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={replyTextarea({ variant })}>{comment.content}</p>
            <div className={replyInfo({ variant })}>
              <div className="flex items-center gap-x-3">
                <Avatar image={comment.user.image} className="h-8 w-8" />
                <span className="visually-hidden">작성자</span>
                <span>{comment.user.nickname}</span>
              </div>
              <time
                dateTime={comment.createdAt}
                title={formatDateToKorean(new Date(comment.createdAt))}
                aria-label={formatDateToKorean(new Date(comment.createdAt))}
                className={replyTimeStamp({ variant })}
              >
                {getTimeAgo(comment.createdAt)}
              </time>
            </div>
            {isAuthor && <ReplyActions actions={actions} />}
          </>
        )}
      </div>
    </div>
  );
}
