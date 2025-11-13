"use client";

import type { Meta, StoryObj } from "@storybook/react";
import CustomMultipleDatepicker from "./multiple-datepicker";
import "@/styles/custom-react-datepicker.css";

const meta = {
  title: "UI/Date-timepicker/MultipleDatepicker",
  component: CustomMultipleDatepicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "CustomMultipleDatepicker 컴포넌트",
      },
    },
  },
  argTypes: {
    startDate: {
      control: "date",
      description: "시작 날짜",
    },
    endDate: {
      control: "date",
      description: "종료 날짜",
    },
    onRangeChange: {
      action: "날짜 범위 변경됨",
      description: "날짜 범위가 변경될 때 호출되는 함수",
    },
  },
} satisfies Meta<typeof CustomMultipleDatepicker>;

export default meta;

type Story = StoryObj<typeof CustomMultipleDatepicker>;

export const Primary: Story = {
  args: {
    startDate: new Date("2025-11-5"),
    endDate: new Date("2025-11-12"),
    onRangeChange: (dates: [Date | null, Date | null]) => {
      console.log("선택된 날짜 범위:", dates);
    },
  },
};
