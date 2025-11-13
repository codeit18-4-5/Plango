import type { Meta, StoryObj } from "@storybook/react";
import CustomSingleDatepicker from "./single-datepicker";
import "@/styles/custom-react-datepicker.css";

const meta = {
  title: "UI/Date-timepicker/singleDatepicker",
  component: CustomSingleDatepicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "CustomSingleDatepicker 컴포넌트",
      },
    },
  },
  argTypes: {
    startDate: {
      control: "date",
      description: "선택 날짜",
    },
    onSingleChange: {
      action: "선택 날짜 변경됨",
      description: "선택 날짜가 변경될 때 호출되는 함수",
    },
  },
} satisfies Meta<typeof CustomSingleDatepicker>;

export default meta;

type Story = StoryObj<typeof CustomSingleDatepicker>;

export const Primary: Story = {
  args: {
    startDate: new Date("2025-11-5"),
    onSingleChange: (date: Date | null) => {
      console.log("선택된 날짜:", date);
    },
  },
};
