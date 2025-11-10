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
      description: "적용할 태그(기본 button)",
      control: false,
    },
    size: {
      description: "버튼 크기",
      control: { type: "radio" },
      options: ["sm", "md", "lg", "icon"],
    },
    shape: {
      description: "버튼 모양",
      control: { type: "radio" },
      options: ["basic", "round"],
    },
    intent: {
      description: "버튼 상태",
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
  args: { children: "로그인 하기" },
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
