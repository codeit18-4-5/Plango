import cn from "@/lib/cn";
import { cva } from "class-variance-authority";

// Reply 컴포넌트 스타일
export const replyWrapper = cva("relative text-body-s text-gray-100 grid", {
  variants: {
    variant: {
      primary: ["bg-gray-800 p-4 rounded-lg", "tablet:py-5 tablet:px-6"],
      secondary: "pb-4 border-b border-gray-600",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const replyInner = cva("relative grid", {
  variants: {
    variant: {
      primary: "gap-y-8",
      secondary: "gap-y-4",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const replyTextarea = cva(
  "w-full scroll-bar resize-none bg-transparent whitespace-pre-line outline-none",
  {
    variants: {
      variant: {
        primary: "text-body-m placeholder:text-gray-400",
        secondary: "text-body-s placeholder:text-gray-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const replyInfo = cva("flex items-center gap-4", {
  variants: {
    variant: {
      primary: "",
      secondary: "justify-between",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const replyTimeStamp = cva("flex items-center", {
  variants: {
    variant: {
      primary: [
        "text-gray-400 ",
        "before:content-[''] before:inline-block before:w-[1px] before:h-[12px] before:bg-gray-700 before:mr-4",
      ],
      secondary: "text-gray-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const REPLY_ACTIONS_STYLES = {
  wrapper: cn("absolute right-0 top-0 text-body-s p-0 z-[5]"),
  icon: cn(
    "h-[16px] w-[16px] text-gray-500 align-top inline-block duration-200",
    "hover:text-gray-400 active:text-gray-300 focus:text-gray-200",
    "tablet:h-[24px] tablet:w-[24px]",
  ),
};
