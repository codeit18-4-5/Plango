import React from "react";
import { Reply } from "@/components/ui";
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
      id: 3,
      image: "",
      nickname: "5팀",
    },
    content: "오늘의 할 일\n\n1. 회의하기 \n2. 컴포넌트 만들기\n3. 잠자기",
    createdAt: "2025-11-09T08:15:00.000Z",
    updatedAt: "2025-11-09T09:20:00.000Z",
  },
];

export default {
  title: "UI/Reply",
  component: Reply,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    docs: {
      description: {
        component: `Reply 컴포넌트. 개별 댓글을 표시하고 편집할 수 있습니다. 작성 길이에 따라 자동으로 크기가 조절되는 텍스트 영역을 포함합니다.`,
      },
      story: {
        inline: true,
      },
      canvas: {
        sourceState: "shown",
      },
    },
  },
  argTypes: {
    comment: {
      description: "댓글 데이터 객체",
      control: { type: "object" },
    },
    isEditing: {
      description: "편집 모드 여부",
      control: { type: "boolean" },
    },
    isAuthor: {
      description: "현재 사용자가 작성자인지 여부",
      control: { type: "boolean" },
    },
    variant: {
      description: "댓글 스타일 변형",
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
  },
};

export const Default = {
  name: "Default",
  render: (args: {
    comment: CommentBase;
    isEditing: boolean;
    isAuthor: boolean;
    variant?: "primary" | "secondary";
  }) => (
    <Reply
      {...args}
      onEdit={() => console.log("편집 시작")}
      onCancelEdit={() => console.log("편집 취소")}
      onSaveEdit={(value: string) => console.log("저장:", value)}
    />
  ),
  args: {
    comment: mockComments[0],
    isEditing: false,
    isAuthor: false,
    variant: "primary",
  },
};

export const SecondaryVariant = {
  name: "Secondary Variant",
  render: (args: {
    comment: CommentBase;
    isEditing: boolean;
    isAuthor: boolean;
    variant?: "primary" | "secondary";
  }) => (
    <Reply
      {...args}
      onEdit={() => console.log("편집 시작")}
      onCancelEdit={() => console.log("편집 취소")}
      onSaveEdit={(value: string) => console.log("저장:", value)}
    />
  ),
  args: {
    comment: mockComments[0],
    isEditing: false,
    isAuthor: true,
    variant: "secondary",
  },
};

export const InteractiveCommentList = {
  name: "Interactive Comment List",
  render: () => {
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [comments, setComments] = React.useState<CommentBase[]>(mockComments);
    const currentUserIds = [1, 3];

    const handleSaveEdit = (commentId: number, newContent: string) => {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, content: newContent, updatedAt: new Date().toISOString() }
            : comment,
        ),
      );
      setEditingId(null);
    };

    return (
      <div className="space-y-4">
        {comments.map(comment => (
          <Reply
            key={comment.id}
            comment={comment}
            isEditing={editingId === comment.id}
            onEdit={() => setEditingId(comment.id)}
            onCancelEdit={() => setEditingId(null)}
            onSaveEdit={(value: string) => handleSaveEdit(comment.id, value)}
            isAuthor={currentUserIds.includes(comment.user.id)}
          />
        ))}
      </div>
    );
  },
};
