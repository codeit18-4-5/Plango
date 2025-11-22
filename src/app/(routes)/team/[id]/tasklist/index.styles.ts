import { cva } from "class-variance-authority";

export const tabButtonStyle = cva(
  [
    "max-w-[70px] overflow-x-hidden text-ellipsis whitespace-nowrap border-b pb-[5px] text-body-m w-full flex-shrink-0",
    "mobile:max-w-[100px]",
  ],
  {
    variants: {
      variant: {
        active: "border-white text-gray-200",
        inactive: "border-background text-gray-500",
      },
    },
  },
);

export const dateTitleStyle = ["text-body-xs text-gray-100", "mobile:text-body-m"].join(" ");

export const newListbuttonStyle = ["text-body-xs text-pink-400", "mobile:text-body-s"].join(" ");

export const hiddenBrStyle = ["block", "mobile:hidden"].join(" ");

export const addTaskListStyle = ["px-[20px]", "mobile:px-[36px]"].join(" ");

export const layoutStyle = [
  "fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-gray-800 w-[100%]",
  "mobile:w-[60%] max-w-[779px]",
].join(" ");
