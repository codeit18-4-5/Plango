import { ReplyInput } from "@/components/ui";
import { CreateArticleComment } from "@/types/article-comment";

const mockComment: CreateArticleComment = {
  content: "",
};

export default {
  title: "Components/ReplyInput",
  component: ReplyInput,
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
      story: {
        inline: true,
      },
      canvas: {
        sourceState: "shown",
      },
    },
  },
  argTypes: {
    variant: {
      description: "댓글 스타일 변형",
      control: { type: "radio" },
      options: ["primary", "secondary"],
      defaultValue: "primary",
    },
  },
};

export const ShortComment = {
  name: "Default",
  render: (args: { variant?: "primary" | "secondary" }) => (
    <ReplyInput comment={mockComment} {...args} />
  ),
};

export const ReplySecondary = {
  name: "Secondary",
  render: (args: { variant?: "primary" | "secondary" }) => (
    <ReplyInput comment={mockComment} {...args} />
  ),
  args: {
    variant: "secondary",
  },
};
