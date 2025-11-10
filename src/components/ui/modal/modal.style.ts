import { cva } from "class-variance-authority";

export const modalOverlayStyle =
  "fixed inset-0 z-[9000] flex items-center justify-center bg-modal-dimmed";

export const modalContainerStyle =
  "w-full max-w-[384px] bg-gray-800 rounded-xl flex flex-col py-[24px] desktop:pt-[24px]";

export const headerWrapperStyle = cva("flex sticky top-0 pb-[24px] items-center text-center", {
  variants: {
    type: {
      titleOnly: "justify-center",
    },
  },
});

export const titleStyle = cva("text-modal", {
  variants: {
    type: {
      closeAreaTitle: "flex-1 ml-[24px]",
    },
  },
});

export const bodyStyle = [
  "max-h-[80vh] overflow-y-auto h-auto [&::-webkit-scrollbar]",
  "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-md",
].join(" ");

export const floatingButtonWrapperStyle = cva(
  "floating-wrapper flex flex-col items-end gap-4 absolute bottom-0 w-[100%]",
  {
    variants: {
      size: {
        short: "px-[36px]",
      },
    },
  },
);
