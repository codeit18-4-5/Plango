import { cva } from "class-variance-authority";

// ReplyInput 컴포넌트 스타일
export const replyInputWrapper = cva("relative flex", {
  variants: {
    variant: {
      primary: "flex-wrap justify-end gap-y-4",
      secondary: "justify-between items-center gap-x-2.5 py-3 border-t border-b border-gray-600",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const replyInputTextarea = cva(
  "w-full overflow-auto resize-none bg-transparent whitespace-pre-line outline-none",
  {
    variants: {
      variant: {
        primary: [
          "min-h-24 border border-gray-600 text-body-m bg-gray-800 rounded-lg p-4",
          "active:border-pink-500 focus:border-pink-400",
          "placeholder:text-gray-400",
        ],
        secondary: [
          "min-h-auto border-0 p-0 rounded-none",
          "h-4 w-[calc(100%-24px)] !text-body-s placeholder:text-gray-500",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const replyInputSubmit = cva("block", {
  variants: {
    variant: {
      primary: ["px-6", "tablet:h-12 tablet:min-w-44 tablet:text-body-m"],
      secondary: ["h-6 w-6 !bg-transparent text-pink-400", "hover:text-pink-500"],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
