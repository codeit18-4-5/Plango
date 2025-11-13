import type { Meta, StoryObj } from "@storybook/react";
import Timepicker from "./timepicker";

const meta = {
  title: "UI/Date-timepicker/timepicker",
  component: Timepicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Timepicker 컴포넌트",
      },
    },
  },
  argTypes: {
    selectedTime: {
      description: "선택 시간",
      control: false,
    },
    onTimeChange: {
      action: "선택 시간 변경됨",
      description: "선택 시간이 변경될 때 호출되는 함수",
    },
  },
} satisfies Meta<typeof Timepicker>;

export default meta;

type Story = StoryObj<typeof Timepicker>;

export const Primary: Story = {
  args: {
    selectedTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      1,
      30,
    ),
    onTimeChange: (time: Date | null) => {
      console.log("선택된 시간:", time);
    },
  },
};
