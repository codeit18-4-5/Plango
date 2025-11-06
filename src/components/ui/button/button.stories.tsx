import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./button";
import Link from "next/link";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "로그인 하기" },
};

export const NextLink: Story = {
  render: () => (
    <Button as={Link} href="/home">
      홈으로 이동
    </Button>
  ),
};

export default meta;
