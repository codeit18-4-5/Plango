import { Reply } from "@/components/ui";
import { taskCommentsSchema } from "@/lib/schema";
import { useAuthStore } from "@/store/auth.store";
import { Comment } from "@/types/comments";
import { useState } from "react";

export default function TaskCommentsField({
  commentsData,
  onSubmit,
  onDelete,
}: {
  commentsData: Comment[];
  onSubmit: (commentId: number) => (comment: string, onSuccess: () => void) => Promise<void>;
  onDelete: (commentId: number) => void;
}) {
  const { user } = useAuthStore();
  const userId = user?.id ?? null;

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editError, setEditError] = useState<Record<number, string>>({});

  const handleCommentSaveClick = async (
    comment: string,
    commentId: number,
    originalComment: string,
  ) => {
    const validation = taskCommentsSchema.safeParse({ content: comment });
    if (originalComment.trim() === comment.trim()) {
      setEditingCommentId(null);
      return;
    }
    if (!validation.success) {
      setEditError({ [commentId]: validation.error.issues[0].message });
      return;
    }

    const submit = onSubmit(commentId);
    await submit(comment, () => {
      setEditError({});
      setEditingCommentId(null);
    });
  };

  return (
    <>
      {commentsData &&
        commentsData.map(comment => (
          <div key={comment.id} className="relative pt-[10px]">
            <Reply
              key={`${comment.id}=${editingCommentId === comment.id}`}
              comment={comment}
              isAuthor={userId === comment.user.id}
              isEditing={editingCommentId === comment.id}
              onCancelEdit={() => {
                setEditingCommentId(null);
                setEditError({});
              }}
              onSaveEdit={value => handleCommentSaveClick(value, comment.id, comment.content)}
              actions={[
                {
                  label: "수정하기",
                  onClick: () => {
                    setEditingCommentId(comment.id);
                    setEditError({});
                  },
                },
                {
                  label: "삭제하기",
                  onClick: () => {
                    onDelete(comment.id);
                  },
                },
              ]}
              variant="secondary"
            />
            {editError && editError[comment.id] && (
              <p className="absolute bottom-[23px] text-body-s text-pink-500">
                {editError[comment.id]}
              </p>
            )}
          </div>
        ))}
    </>
  );
}
