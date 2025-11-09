import cn from "@/lib/cn";

export const IMG_UPLOAD_STYLES = {
  wrapper: (preview: boolean, error: boolean) =>
    cn(
      "relative w-[160px] h-[160px] rounded-[12px] overflow-hidden bg-gray-800 duration-200 border border-gray-700",
      "hover:border-pink-500",
      "tablet:w-[282px] tablet:h-[282px]",
      { "border-gray-600": preview, "border-red-400": error },
    ),
  input: cn("absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"),
  label: cn(
    "absolute w-full h-full top-0 left-0 cursor-pointer text-gray-400 grid gap-[12px] justify-center items-center text-body-m content-center",
  ),
  image: cn("object-contain"),
  button: cn(
    "absolute top-0 left-0 w-full h-full flex justify-center items-center bg-dimmed-overlay z-3",
  ),
  icon: {
    plus: cn("w-[24px] h-[24px] text-gray-400", "tablet:w-[48px] tablet:h-[48px]"),
    cancel: cn("w-[36px] h-[36px]", "tablet:w-[40px] tablet:h-[40px]"),
  },
  errorMsg: cn("text-red-400 text-caption mt-2 block"),
};
