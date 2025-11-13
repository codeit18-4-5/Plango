"use client";

import cn from "@/lib/cn";
import { useEffect } from "react";
import { CommentBase } from "@/types/comment-base";
import { useEditable, useAutoResizeTextarea } from "@/hooks";
import { replyWrapper, replyInner, replyTextarea, replyInfo, replyTimeStamp } from "./index.styles";
import { Avatar, Button } from "@/components/ui";
import ReplyActions from "./reply-actions";
import { getTimeAgo } from "@/lib/utils";

type ReplyProps = {
  comment: CommentBase;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (value: string) => void;
  isAuthor: boolean;
  variant?: "primary" | "secondary";
};

export default function Reply({
  comment,
  isEditing,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  isAuthor,
  variant = "primary",
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
                className={cn(
                  "bg-transparent text-gray-500",
                  "hover:bg-transparent hover:text-gray-400",
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
                <span>{comment.user.nickname}</span>
              </div>
              <span className={replyTimeStamp({ variant })}>{getTimeAgo(comment.createdAt)}</span>
            </div>
            {isAuthor && (
              <ReplyActions
                actions={[
                  { label: "수정하기", onClick: onEdit },
                  { label: "삭제하기", onClick: () => {} },
                ]}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
