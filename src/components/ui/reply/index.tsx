"use client";

import cn from "@/lib/cn";
import { useRef, useEffect } from "react";
import { ArticleComment } from "@/types/article-comment";
import { useToggle, useClickOutside, useEditable, useAutoResizeTextarea } from "@/hooks";
import { replyWrapper, replyInner, replyTextarea, replyInfo, replyTimeStamp } from "./index.styles";
import { Avatar, Button } from "@/components/ui";
import { getTimeAgo } from "@/lib/utils";
import IcKebab from "@/assets/icons/ic-kebab.svg";

type ReplyProps = {
  comment: ArticleComment;
  variant?: "primary" | "secondary";
};

export default function Reply({ comment, variant = "primary" }: ReplyProps) {
  const {
    isEditing,
    editedContent,
    startEditing,
    cancelEditing,
    saveEditing,
    isSaveDisabled,
    setEditedContent,
  } = useEditable(comment.content);

  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const { isOn: isMenuOpen, toggle: toggleMenu, setOff: closeMenu } = useToggle(false);
  useClickOutside(menuWrapperRef, closeMenu);

  const hasActionMenu = true;

  const { textareaRef, onChange, resize } = useAutoResizeTextarea();

  useEffect(() => {
    if (isEditing) {
      resize();
    }
  }, [isEditing, resize]);

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
                onClick={cancelEditing}
                size="sm"
                className={cn(
                  "bg-transparent text-gray-500",
                  "hover:bg-transparent hover:text-gray-400",
                )}
              >
                취소
              </Button>
              <Button onClick={saveEditing} disabled={isSaveDisabled} size="sm" intent="tertiary">
                수정하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={replyTextarea({ variant })}>{comment.content}</p>
            <div className={replyInfo({ variant })}>
              <div className="flex items-center gap-x-[12px]">
                <Avatar image={comment.writer.image} className="h-8 w-8" />
                <span>{comment.writer.nickname}</span>
              </div>
              <span className={replyTimeStamp({ variant })}>{getTimeAgo(comment.createdAt)}</span>
            </div>

            <div ref={menuWrapperRef} className="z-5 absolute right-0 top-0">
              <Button
                shape="basic"
                intent="primary"
                size="icon"
                aria-label="액션 메뉴"
                onClick={toggleMenu}
              >
                <IcKebab className="text-gray-500" />
              </Button>
              {isMenuOpen && hasActionMenu && (
                <div onClick={closeMenu} className="absolute right-0 top-full">
                  <Button onClick={startEditing} intent="tertiary">
                    수정하기
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
