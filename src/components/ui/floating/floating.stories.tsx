import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "../button/button";
import FloatingWrapper from "./floating-wrapper";
import CircleButton from "../button/circle-button";
const meta: Meta<typeof FloatingWrapper> = {
  title: "UI/Floating",
  component: FloatingWrapper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "플로팅 컨텐츠 컴포넌트",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "추가 클래스네임",
    },
    children: {
      control: "text",
      description: "내부 컨텐츠",
    },
  },
  decorators: [
    Story => (
      <div className="min-h-40">
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative">
      <FloatingWrapper>
        <Button shape="round">+ 글쓰기</Button>
      </FloatingWrapper>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="relative h-[300px]">
      <FloatingWrapper>
        <CircleButton>
          <span className="text-2xl">✎</span>
        </CircleButton>
        <CircleButton>
          <span className="text-2xl">↑</span>
        </CircleButton>
        <CircleButton>
          <span className="text-2xl">+</span>
        </CircleButton>
      </FloatingWrapper>
    </div>
  ),
};

export default meta;
