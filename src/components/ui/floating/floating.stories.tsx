import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "../button/button";
import FloatingWrapper from "./floating-wrapper";
import FloatingButton from "./floating-button";
const meta: Meta<typeof FloatingWrapper> = {
  title: "UI/Floating",
  component: FloatingWrapper,
  tags: ["autodocs"],
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
        <Button shape="round">↑TOP</Button>
        <Button shape="round">✎ 글쓰기</Button>
        <Button shape="round" intent="secondary">
          ✓ 완료하기
        </Button>
        <FloatingButton>+</FloatingButton>
      </FloatingWrapper>
    </div>
  ),
};

export default meta;
