import { cva } from "class-variance-authority";

export const alertOverlayStyle = cva("fixed inset-0 z-[9999] flex items-center justify-center");

export const alertContainerStyle = cva(
  [
    "flex flex-col rounded-xl bg-gray-800 px-4 pb-8 pt-4 text-center items-center",
    "p-0 tablet:px-4 tablet:pb-8 tablet:pt-4",
    "absolute bottom-0 mobile:relative mobile:bottom-auto",
  ],
  {
    variants: {
      size: {
        md: "w-[375px]",
        lg: "w-[384px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

export const alertIcon = cva("mt-[24px] w-[24px] h-[24px]");

export const alertTextStyle = cva("", {
  variants: {
    variant: {
      title: "text-gray-100 text-body-m",
      descriptionMessage: "text-gray-300 text-body-s mt-[8px]",
    },
    spacing: {
      default: "mt-[32px]",
      leave: "mt-[16px]",
    },
  },
});

export const buttonContainerStyle = cva("mt-[24px] flex justify-center gap-[8px]");

export const alertButtonStyle = cva("w-[136px]", {
  variants: {
    variant: {
      cancel: [
        "border-gray-500 text-gray-500",
        "hover:border-gray-500 hover:bg-gray-200",
        "active:border-gray-300 active:bg-gray-300",
      ].join(" "),
      confirm: "hover:bg-red-700 active:bg-red-800",
    },
  },
  defaultVariants: {
    variant: "confirm",
  },
});
