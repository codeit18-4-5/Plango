"use client";

//import cn from "@/lib/cn";
import { useRef } from "react";
import { ArticleComment } from "@/types/article-comment";
import { useToggle, useClickOutside, useEditable } from "@/hooks";
import { Avatar, Button } from "@/components/ui";
import { getTimeAgo } from "@/lib/utils";
import IcKebab from "@/assets/icons/ic-kebab.svg";

type ReplyProps = {
  comment: ArticleComment;
};

export default function Reply({ comment }: ReplyProps) {
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

  return (
    <div>
      {isEditing ? (
        <>
          <textarea
            id={`comment-${comment.id}`}
            value={editedContent}
            placeholder="수정할 댓글을 입력해주세요"
            onChange={e => setEditedContent(e.target.value)}
          />
          <div>
            <Button onClick={cancelEditing}>취소</Button>
            <Button onClick={saveEditing} disabled={isSaveDisabled}>
              저장
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div ref={menuWrapperRef}>
              <Button
                shape="basic"
                intent="primary"
                size="icon"
                aria-label="액션 메뉴"
                onClick={toggleMenu}
              >
                <IcKebab />
              </Button>
              {isMenuOpen && hasActionMenu && (
                <div onClick={closeMenu}>
                  <Button onClick={startEditing} intent="tertiary">
                    수정
                  </Button>
                </div>
              )}
            </div>
          </div>
          <p>{comment.content}</p>
          <div>
            <Avatar image={comment.writer.image} />
            <span>{comment.writer.nickname}</span>
          </div>
          <span>{getTimeAgo(comment.createdAt)}</span>
        </>
      )}
    </div>
  );
}
