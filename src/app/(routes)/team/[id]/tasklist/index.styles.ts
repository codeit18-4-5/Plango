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

export const dateTitleStyle = ["text-body-xs text-gray-100", "mobile:text-body-s"].join(" ");

export const newListbuttonStyle = ["text-body-xs text-pink-400", "mobile:text-body-s"].join(" ");

export const hiddenBrStyle = ["block", "mobile:hidden"].join(" ");
