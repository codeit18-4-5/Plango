import { cva } from "class-variance-authority";

export const backgroundButton = [
  "text-white bg-pink-400",
  "hover:bg-pink-500 active:bg-pink-600",
  "disabled:bg-gray-400 aria-disabled:bg-gray-400",
].join(" ");

const outlineButtonBase = [
  "text-pink-400 border border-pink-400",
  "hover:border-pink-500 active:border-pink-600",
  "disabled:text-gray-400 disabled:border-gray-400 aria-disabled:text-gray-400 aria-disabled:border-gray-400",
].join(" ");

const buttonStyle = cva("flex items-center justify-center gap-1 whitespace-nowrap", {
  variants: {
    size: {
      sm: "text-sm py-1.5 px-3 h-8",
      md: "text-sm py-2.5 px-[1.375rem] h-10",
      lg: "text-base py-3 px-6 h-12",
      icon: "w-auto h-auto",
    },
    shape: {
      basic: "rounded-xl",
      round: "rounded-full",
    },
    intent: {
      primary: backgroundButton,
      secondary: `${outlineButtonBase} bg-white`,
      tertiary: outlineButtonBase,
      danger: "text-white bg-red-400",
    },
    full: {
      true: "w-full",
      false: "w-auto",
    },
    disabled: {
      true: "pointer-events-none aria-disabled:cursor-not-allowed",
      false: "pointer-events-auto",
    },
  },
  compoundVariants: [
    {
      size: "icon",
      className: "rounded-full bg-transparent border-transparent",
    },
  ],
  defaultVariants: {
    size: "lg",
    shape: "basic",
    intent: "primary",
    full: false,
    disabled: false,
  },
});
export default buttonStyle;
