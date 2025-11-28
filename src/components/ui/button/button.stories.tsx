import type { Meta, StoryObj } from "@storybook/nextjs";
import Button from "./button";
import Link from "next/link";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "공통 버튼 컴포넌트",
      },
    },
  },
  argTypes: {
    children: {
      description: "버튼 내용",
      control: { type: "text" },
    },
    as: {
      description: `적용할 태그(Default: button)
    - Link 컴포넌트 사용시 해당 페이지에서 import 후 as={Link}`,
      control: { type: "radio" },
      options: ["button", "a"],
    },
    size: {
      description: "버튼 크기 (Default: lg)",
      control: { type: "radio" },
      options: ["sm", "md", "lg", "icon"],
    },
    shape: {
      description: "버튼 모양 (Default: basic)",
      control: { type: "radio" },
      options: ["basic", "round"],
    },
    intent: {
      description: "버튼 상태 (Default: primary)",
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary", "danger"],
    },
    full: {
      description: "전체 너비",
      control: { type: "boolean" },
    },
    disabled: {
      description: "비활성화",
      control: { type: "boolean" },
    },
    className: {
      description: "추가 클래스네임",
      control: { type: "text" },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "로그인 하기", full: false, disabled: false },
};

export const Icon: Story = {
  render: () => <Button size="icon">😀</Button>,
};

export const NextLink: Story = {
  render: () => (
    <Button as={Link} href="/home">
      홈으로 이동
    </Button>
  ),
};

export default meta;
