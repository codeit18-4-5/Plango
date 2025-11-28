import { cva } from "class-variance-authority";
export const inputBase = [
  "w-full px-4 py-3 bg-transparent resize-none",
  "text-gray-100 text-sm tablet:text-base",
  "rounded-xl border border-gray-600",
  "placeholder:text-gray-500 focus:border-pink-300 focus-visible:outline-none hover:border-pink-500",
].join(" ");

export const inputLabelStyle = cva("flex items-center text-base text-gray-100", {
  variants: {
    size: {
      sm: "mb-3",
      md: "mb-4",
    },
    hidden: {
      true: "visually-hidden",
      false: "",
    },
  },

  defaultVariants: {
    size: "sm",
  },
});

export const inputErrorStyle = "pt-2 text-sm text-red-400";

const inputStyle = cva(inputBase, {
  variants: {
    inputSize: {
      sm: "",
      md: "tablet:px-6",
    },
    intent: {
      text: "",
      password: "pr-10",
      search: "pl-12 tablet:pl-[3.25rem]",
      textarea: `scroll-bar min-h-20`,
    },
    disabled: {
      true: "pointer-events-none disabled:text-gray-400 disabled:bg-gray-700",
      false: "pointer-events-auto",
    },
    error: {
      true: "border-red-400",
      false: "",
    },
  },

  defaultVariants: {
    inputSize: "sm",
    intent: "text",
    disabled: false,
    error: false,
  },
});
export default inputStyle;
