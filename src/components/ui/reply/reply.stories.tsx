import { Reply } from "@/components/ui";
import { ArticleComment } from "@/types/article-comment";

const mockComments = {
  short: {
    id: 1,
    writer: {
      id: 1,
      image: "/assets/images/img-test.jpeg",
      nickname: "참깨",
    },
    content: "힘내요!!",
    createdAt: "2025-11-09T10:30:00.000Z",
    updatedAt: "2025-11-09T10:30:00.000Z",
  },
  long: {
    id: 2,
    writer: {
      id: 2,
      image: "/assets/images/img-test.jpeg",
      nickname: "5팀",
    },
    content: "오늘의 할 일\n\n1. 회의하기 \n2. 컴포넌트 만들기\n3. 잠자기",
    createdAt: "2025-11-09T08:15:00.000Z",
    updatedAt: "2025-11-09T09:20:00.000Z",
  },
  noImage: {
    id: 3,
    writer: {
      id: 3,
      image: "",
      nickname: "익명",
    },
    content: "프로필 이미지가 없는 경우의 댓글입니다.",
    createdAt: "2025-11-09T07:45:00.000Z",
    updatedAt: "2025-11-09T07:45:00.000Z",
  },
} satisfies Record<string, ArticleComment>;

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
        component: "Reply 컴포넌트",
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
      control: { type: "radio" },
      options: ["short", "long", "noImage"],
      mapping: {
        short: mockComments.short,
        long: mockComments.long,
        noImage: mockComments.noImage,
      },
    },
    variant: {
      description: "댓글 스타일 변형",
      control: { type: "radio" },
      options: ["primary", "secondary"],
      defaultValue: "primary",
      mapping: {
        short: mockComments.short,
        long: mockComments.long,
        noImage: mockComments.noImage,
      },
    },
  },
};

export const ShortComment = {
  name: "Default",
  render: (args: { comment: ArticleComment; variant?: "primary" | "secondary" }) => (
    <Reply {...args} />
  ),
  args: {
    comment: mockComments.short,
  },
};

export const ReplySecondary = {
  name: "Secondary",
  render: (args: { comment: ArticleComment; variant?: "primary" | "secondary" }) => (
    <Reply {...args} />
  ),
  args: {
    comment: mockComments.short,
    variant: "secondary",
  },
};

export const LongComment = {
  name: "Long Comment",
  render: (args: { comment: ArticleComment; variant?: "primary" | "secondary" }) => (
    <Reply {...args} />
  ),
  args: {
    comment: mockComments.long,
  },
};

export const NoImage = {
  name: "No Image",
  render: () => <Reply comment={mockComments.noImage} />,
};
