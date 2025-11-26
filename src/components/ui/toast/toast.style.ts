import { cva } from "class-variance-authority";

export const toastContainer = cva(
  "flex justify-between border rounded-xl bg-gray-800 px-4 py-3 border-pink-400 min-w-[280px]",
  {
    variants: {
      intent: {
        success: "border-green-400",
        error: "border-red-400",
      },
    },
  },
);

export const toast = cva("flex gap-2 text-base text-pink-400", {
  variants: {
    intent: {
      success: "text-green-400",
      error: "text-red-400",
    },
  },
});

export const toastIcon = "w-6 h-6 flex-shrink-0";
