"use client";

//import cn from "@/lib/cn";
import { ArticleComment } from "@/types/article-comment";
import { Avatar, Button } from "@/components/ui";
import { getTimeAgo } from "@/lib/utils";
import useEditable from "@/hooks/use-editable";
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
            <Button shape="basic" intent="primary" size="icon" aria-label="액션 메뉴">
              <IcKebab />
            </Button>
            <Button onClick={startEditing} intent="tertiary">
              수정
            </Button>
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
