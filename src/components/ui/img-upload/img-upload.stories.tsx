import type { Meta, StoryObj } from "@storybook/react";
import { ImgUpload } from "@/components/ui";

const meta = {
  title: "UI/ImgUpload",
  component: ImgUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "ImgUpload 컴포넌트",
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof ImgUpload>;

export default meta;

type Story = StoryObj<typeof ImgUpload>;

export const Default: Story = {
  name: "Default",
  args: {},
};
