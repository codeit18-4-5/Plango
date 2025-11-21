import { useState } from "react";
import { ReplyInput, Reply } from "@/components/ui";
import { CommentBase } from "@/types/comment-base";

const mockComments: CommentBase[] = [
  {
    id: 1,
    user: {
      id: 1,
      image: "/assets/images/img-test.jpeg",
      nickname: "참깨",
    },
    content: "힘내요!!",
    createdAt: "2025-11-09T10:30:00.000Z",
    updatedAt: "2025-11-09T10:30:00.000Z",
  },
  {
    id: 2,
    user: {
      id: 2,
      image: "/assets/images/img-test.jpeg",
      nickname: "참깨",
    },
    content: "힘내요!!",
    createdAt: "2025-11-09T10:30:00.000Z",
    updatedAt: "2025-11-09T10:30:00.000Z",
  },
  {
    id: 3,
    user: {
      id: 123,
      image: "",
      nickname: "5팀",
    },
    content: "오늘의 할 일\n\n1. 회의하기 \n2. 컴포넌트 만들기\n3. 잠자기",
    createdAt: "2025-11-09T08:15:00.000Z",
    updatedAt: "2025-11-09T09:20:00.000Z",
  },
];

const currentUserId = 123;

export default function ArticleCommentSection() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [comments, setComments] = useState<CommentBase[]>(mockComments);

  return (
    <section>
      <h4>댓글 달기</h4>
      <ReplyInput />
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <Reply
              comment={comment}
              isEditing={editingId === comment.id}
              onCancelEdit={() => setEditingId(null)}
              onSaveEdit={updatedContent => {
                setComments(prev =>
                  prev.map(target =>
                    target.id === comment.id ? { ...target, content: updatedContent } : target,
                  ),
                );
                setEditingId(null);
              }}
              isAuthor={comment.user.id === currentUserId}
              actions={
                comment.user.id === currentUserId
                  ? [
                      {
                        label: "수정하기",
                        onClick: () => setEditingId(comment.id),
                      },
                      {
                        label: "삭제하기",
                        onClick: () => alert("삭제"),
                      },
                    ]
                  : []
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
