import { cva } from "class-variance-authority";

export const modalOverlayStyle = [
  "fixed inset-0 z-[5000] flex items-center justify-center",
  "custom-dialog-backdrop bg-transparent overflow-hidden",
  "rounded-t-xl",
].join(" ");

export const modalContainerStyle = [
  "w-[100vw] max-w-[384px] bg-gray-800 rounded-t-xl flex flex-col desktop:pt-[24px]",
  "mobile:w-[380px] mobile:max-w-full",
  "fixed bottom-0 left-0 mobile:relative mobile:bottom-auto mobile:rounded-bl-0 mobile:rounded-b-xl",
].join(" ");

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
  "max-h-[80vh] overflow-y-auto h-auto flex-1 pb-[70px]",
  "scroll-bar",
].join(" ");

export const floatingButtonWrapperStyle =
  "floating-wrapper flex flex-col items-end gap-4 absolute bottom-0 w-full";
