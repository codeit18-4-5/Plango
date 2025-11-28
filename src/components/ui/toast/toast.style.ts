import { cva } from "class-variance-authority";

export const toastContainer = "z-9999 fixed right-10 top-24 flex flex-col gap-4";

export const toastBox = cva(
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

export const toast = "flex gap-2 text-base text-gray-100 items-center whitespace-pre-line";

export const toastIcon = "w-6 h-6 flex-shrink-0";
