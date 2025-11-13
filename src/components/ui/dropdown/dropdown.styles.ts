import { cva } from "class-variance-authority";

export const dropDownStyle = cva("relative inline-block", {
  variants: {
    size: {
      sm: "w-[94px]",
      md: "w-[120px]",
    },
  },
});

export const dropDownTriggerStyle = cva("relative w-full flex items-center ", {
  variants: {
    size: {
      sm: "p-[8px]",
      md: "px-[16px] py-[10px]",
    },
    intent: {
      select: "rounded-[8px] bg-gray-800 justify-between",
      icon: "justify-end",
    },
  },
});

export const dropDownMenuStyle =
  "absolute bg-gray-800 border border-gray-700 rounded-[12px] mt-[8px] z-[9999] right-0 w-full  overflow-hidden";

export const dropDownOptionStyle = cva("py-[11px] w-full block hover:bg-gray-700 ", {
  variants: {
    size: {
      sm: "px-[8px]",
      md: "px-[16px]",
    },
    align: {
      center: "text-center",
      left: "text-left",
    },
  },
  defaultVariants: { size: "md", align: "left" },
});
