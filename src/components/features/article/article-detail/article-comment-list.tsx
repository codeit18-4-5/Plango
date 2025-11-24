import React from "react";
import { User } from "@/types/user";
import { ArticleComment } from "@/types/article-comment";
import { Reply } from "@/components/ui";
import { ArticleListEmpty } from "@/components/features/article";
import ReplySkeleton from "@/components/skeleton-ui/reply-skeleton";
import { ARTICLE_COMMENT_STYLES } from "../index.styles";

interface ArticleCommentListProps {
  comments: ArticleComment[];
  isPending: boolean;
  isFetchingNextPage: boolean;
  ObserverRef: React.RefObject<HTMLDivElement | null>;
  editingId: number | null;
  currentUser: User | null;
  handleEditSave: (commentId: number, updatedContent: string) => void;
  handleCancelEdit: () => void;
  handleDelete: (commentId: number) => void;
  handleEditStart: (commentId: number) => void;
}

export const NEXT_CURSOR = 4;

export default function ArticleCommentList({
  comments,
  isPending,
  isFetchingNextPage,
  ObserverRef,
  editingId,
  currentUser,
  handleEditSave,
  handleCancelEdit,
  handleDelete,
  handleEditStart,
}: ArticleCommentListProps) {
  if (isPending) {
    return (
      <div className={ARTICLE_COMMENT_STYLES.replyList}>
        {Array.from({ length: 2 }).map((_, i) => (
          <ReplySkeleton key={i} />
        ))}
      </div>
    );
  }
  if (comments.length === 0) {
    return <ArticleListEmpty>작성된 댓글이 없습니다.</ArticleListEmpty>;
  }
  return (
    <>
      <ul className={ARTICLE_COMMENT_STYLES.replyList}>
        {comments.map((comment: ArticleComment) => {
          const replyComment = {
            ...comment,
            user: {
              ...comment.writer,
              image: comment.writer.image ?? null,
            },
          };
          return (
            <li key={comment.id}>
              <Reply
                comment={replyComment}
                isEditing={editingId === comment.id}
                onSaveEdit={updatedContent => handleEditSave(comment.id, updatedContent)}
                onCancelEdit={handleCancelEdit}
                isAuthor={comment.writer.id === currentUser?.id}
                actions={
                  comment.writer.id === currentUser?.id
                    ? [
                        { label: "수정하기", onClick: () => handleEditStart(comment.id) },
                        { label: "삭제하기", onClick: () => handleDelete(comment.id) },
                      ]
                    : []
                }
              />
            </li>
          );
        })}
        {isFetchingNextPage &&
          Array.from({ length: NEXT_CURSOR }).map((_, i) => (
            <li key={`skeleton-${i}`}>
              <ReplySkeleton />
            </li>
          ))}
      </ul>
      <div ref={ObserverRef} className="infinite-scroll-trigger" />
    </>
  );
}
