"use client";

//import cn from "@/lib/cn";
import { Comments } from "@/types/comments";
import { Avatar, Button } from "@/components/ui";
import { getTimeAgo } from "@/lib/utils";
import useEditable from "@/hooks/use-editable";

type ReplyProps = {
  comment: Comments;
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
          <Button onClick={startEditing}>수정</Button>

          <p>{comment.content}</p>
          <div>
            <Avatar image={comment.user.image} />
            <span>{comment.user.nickname}</span>
          </div>
          <span>{getTimeAgo(comment.createdAt)}</span>
        </>
      )}
    </div>
  );
}
