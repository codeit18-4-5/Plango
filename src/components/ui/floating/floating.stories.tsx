import type { Meta, StoryObj } from "@storybook/nextjs";
import Button from "../button/button";
import Floating from "./floating";
import CircleButton from "../button/circle-button";
import ScrollTopButton from "../button/scroll-top-button";
import IcEdit from "@/assets/icons/ic-pencil.svg";
const meta: Meta<typeof Floating> = {
  title: "UI/Floating",
  component: Floating,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "내부 요소를 플로팅으로 변경해주는 wrapper",
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
      <Floating>
        <Button shape="round">+ 글쓰기</Button>
      </Floating>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="relative h-[300px]">
      <Floating>
        <ScrollTopButton />
        <CircleButton>
          <IcEdit className="h-6 w-6" />
        </CircleButton>
      </Floating>
    </div>
  ),
};

export default meta;
