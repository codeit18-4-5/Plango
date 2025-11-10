import { cva } from "class-variance-authority";

export const avatarStyles = cva("relative inline-block overflow-hidden", {
  variants: {
    shape: {
      basic: "rounded-full",
      square: "rounded-[6px]",
    },
  },
  defaultVariants: {
    shape: "basic",
  },
});
