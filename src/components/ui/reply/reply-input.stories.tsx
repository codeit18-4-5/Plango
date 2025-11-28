import ReplyInput from "./reply-input";
import type { ComponentProps } from "react";

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
    value: {
      description: "입력값 (controlled)",
      control: { type: "text" },
      defaultValue: "",
    },
    onChange: {
      description: "입력값 변경 핸들러",
      action: "changed",
    },
    onSubmit: {
      description: "댓글 등록 시 호출되는 콜백 함수",
      action: "submitted",
    },
  },
};

export const Primary = {
  name: "Primary",
  render: (args: ComponentProps<typeof ReplyInput>) => <ReplyInput {...args} />,
  args: {
    variant: "primary",
    value: "",
    onSubmit: (value: string) => console.log(value),
    onChange: () => {},
  },
};

export const Secondary = {
  name: "Secondary",
  render: (args: ComponentProps<typeof ReplyInput>) => <ReplyInput {...args} />,
  args: {
    variant: "secondary",
    value: "",
    onSubmit: (value: string) => console.log(value),
    onChange: () => {},
  },
};
