import { cva } from "class-variance-authority";

export const alertOverlayStyle =
  "fixed inset-0 z-[9999] flex items-center justify-center bg-modal-dimmed";

export const alertContainerStyle = cva(
  [
    "flex flex-col bg-gray-800 px-4 pb-8 pt-4 text-center items-center rounded-t-xl h-auto",
    "p-0 tablet:px-4 tablet:pb-8 tablet:pt-4",
    "absolute bottom-0 mobile:relative mobile:bottom-auto mobile:rounded-bl-0 mobile:rounded-b-xl",
  ],
  {
    variants: {
      size: {
        md: "max-w-[375px] w-[100%]",
        lg: "max-w-[384px] w-[100%]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

export const alertIcon = "mt-[24px] w-[24px] h-[24px]";

export const textContainer = cva(
  [
    "max-h-[30vh] overflow-y-auto w-full [&::-webkit-scrollbar]:h-2",
    "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-md",
  ],
  {
    variants: {
      spacing: {
        default: "mt-[32px]",
        leave: "mt-[16px]",
      },
    },
  },
);

export const alertTextStyle = cva("", {
  variants: {
    variant: {
      title: "text-gray-100 text-modal break-words whitespace-pre-wrap w-full",
      descriptionMessage:
        "text-gray-300 text-body-s mt-[8px] break-words whitespace-pre-wrap w-full",
    },
  },
});

export const buttonContainerStyle = "mt-[24px] flex justify-center gap-[8px]";

export const alertButtonStyle = "flex-none w-[134px]";
