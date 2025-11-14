import ReplyInput from "./reply-input";

export default {
  title: "UI/ReplyInput",
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
      description: {
        component:
          "ReplyInput 컴포넌트. 댓글 작성 시 입력에 따라 입력창 높이가 자동으로 조절됩니다.",
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
    variant: {
      description: "댓글 입력 스타일 변형",
      control: { type: "radio" },
      options: ["primary", "secondary"],
      defaultValue: "primary",
    },
    onSubmit: {
      description: "댓글 등록 시 호출되는 콜백 함수",
      action: "submitted",
    },
  },
};

export const Primary = {
  name: "Primary",
  render: (args: { variant?: "primary" | "secondary"; onSubmit?: (value: string) => void }) => (
    <ReplyInput {...args} />
  ),
  args: {
    variant: "primary",
    onSubmit: (value: string) => console.log("댓글 등록:", value),
  },
};

export const Secondary = {
  name: "Secondary",
  render: (args: { variant?: "primary" | "secondary"; onSubmit?: (value: string) => void }) => (
    <ReplyInput {...args} />
  ),
  args: {
    variant: "secondary",
    onSubmit: (value: string) => console.log("댓글 등록:", value),
  },
};
