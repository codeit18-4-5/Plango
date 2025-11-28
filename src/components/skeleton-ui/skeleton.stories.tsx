import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "`react-loading-skeleton` 라이브러리 기반 Skeleton 컴포넌트",
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
  },
  decorators: [
    Story => (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Story />
      </div>
    ),
  ],

  argTypes: {
    count: { control: "number", description: "스켈레톤 라인 수 설정" },
    circle: { control: "boolean", description: "원형 스켈레톤" },
    width: { control: "text", description: "너비(px, %)" },
    height: { control: "text", description: "높이(px, %)" },
    borderRadius: { control: "text", description: "모서리 둥글기(px, rem)" },
    baseColor: { control: "color", description: "스켈레톤 배경 컬러" },
    highlightColor: { control: "color", description: "스켈레톤 하이라이트 컬러" },
    duration: { control: "number", description: "애니메이션 속도(초)" },
    inline: { control: "boolean", description: "인라인 렌더링 여부" },
    direction: { control: "select", options: ["ltr", "rtl"], description: "애니메이션 진행 방향" },
    enableAnimation: { control: "boolean", description: "애니메이션 활성화" },
    style: { control: "object", description: "인라인 스타일" },
    className: { control: "text", description: "커스텀 클래스 이름" },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {
  args: {
    count: 1,
    width: 200,
    height: 20,
  },
};

export const MultipleLines: Story = {
  args: {
    count: 3,
    width: 200,
    height: 20,
  },
};

export const Circle: Story = {
  args: {
    circle: true,
    width: 60,
    height: 60,
  },
};

export const CustomColors: Story = {
  args: {
    baseColor: "var(--pink-400)",
    highlightColor: "var(--pink-300)",
    width: 200,
    height: 20,
  },
};

export const Rounded: Story = {
  args: {
    borderRadius: "16px",
    width: 200,
    height: 20,
  },
};

export const AnimationSpeed: Story = {
  args: {
    duration: 3,
    width: 200,
    height: 20,
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    count: 2,
    width: 80,
    height: 20,
  },
};

export const DirectionRTL: Story = {
  args: {
    direction: "rtl",
    width: 200,
    height: 20,
  },
};

export const NoAnimation: Story = {
  args: {
    enableAnimation: false,
    width: 200,
    height: 20,
  },
};

export const CustomStyle: Story = {
  args: {
    style: {
      marginTop: "16px",
      background:
        "linear-gradient(90deg,var(--purple-400), var(--rose-400), var(--yellow-400), var(--blue-400)",
    },
    width: 200,
    height: 20,
  },
};

export const CustomClass: Story = {
  args: {
    className: "my-skeleton-class",
    width: 200,
    height: 20,
  },
};

export const Example: Story = {
  render: () => (
    <div className="w-full rounded-lg border border-gray-700 bg-gray-800 p-[24px_32px]">
      <div className="flex w-full items-center justify-between">
        <div className="w-[calc(100%-72px)]">
          <Skeleton height={18} width={"50%"} />
          <Skeleton height={18} width={"42%"} style={{ marginTop: 10 }} />
        </div>
        <Skeleton height={72} width={72} borderRadius={8} />
      </div>
      <div className="mt-[40px] flex w-full items-center justify-between gap-3">
        <div className="flex w-[calc(100%-72px)] items-center gap-3">
          <Skeleton circle={true} height={32} width={32} />
          <Skeleton height={16} width={72} />
        </div>
        <Skeleton height={16} width={72} />
      </div>
    </div>
  ),
};
