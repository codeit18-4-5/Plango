import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/ui";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Avatar 컴포넌트",
      },
    },
  },
  argTypes: {
    shape: {
      description: "아바타 모양",
      control: { type: "radio" },
      options: ["basic", "square"],
    },
    image: {
      description: "프로필 이미지 URL",
      control: { type: "text" },
    },
    alt: {
      description: "이미지 대체 텍스트",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    shape: "basic",
    alt: "사용자 프로필",
    className: "w-12 h-12",
  },
};

export const WithImage: Story = {
  args: {
    shape: "basic",
    image: "/assets/images/img-test.jpeg",
    alt: "사용자 프로필",
    className: "w-12 h-12",
  },
};

export const Square: Story = {
  args: {
    shape: "square",
    alt: "사용자 프로필",
    className: "w-12 h-12",
  },
};

export const SquareWithImage: Story = {
  args: {
    shape: "square",
    image: "/assets/images/img-test.jpeg",
    alt: "사용자 프로필",
    className: "w-12 h-12",
  },
};
