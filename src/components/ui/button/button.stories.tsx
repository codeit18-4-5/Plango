import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./button";
import Link from "next/link";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "공통 버튼 컴포넌트",
      },
    },
  },
  argTypes: {
    as: {
      description: "적용할 태그(기본 button)",
    },
    size: {
      description: "버튼 크기",
    },
    shape: {
      description: "버튼 round",
    },
    intent: {
      description: "버튼 상태",
    },
    full: {
      description: "전체 너비",
    },
    disabled: {
      description: "비활성화",
    },
    className: {
      description: "추가 클래스네임",
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
