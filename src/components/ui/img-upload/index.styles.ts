import cn from "@/lib/cn";

export const IMG_UPLOAD_STYLES = {
  wrapper: (preview: boolean, error: boolean, isDragActive?: boolean) =>
    cn(
      "relative w-[200px] h-[200px] rounded-[12px] overflow-hidden duration-200 border border-gray-700",
      "hover:border-pink-500",
      "tablet:w-[282px] tablet:h-[282px]",
      preview ? "border-gray-600" : "",
      error ? "border-red-400" : "",
      isDragActive ? "bg-pink-800 border-dashed border-pink-500" : "bg-gray-800",
    ),
  input: cn("absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"),
  label: (isDragActive?: boolean) =>
    cn(
      "absolute w-full h-full top-0 left-0 cursor-pointer [&>span]:text-gray-400 grid gap-[12px] justify-center items-center text-body-m content-center",
      isDragActive ? "[&>span]:text-gray-00" : "",
    ),
  image: cn("object-contain"),
  button: cn(
    "absolute top-0 left-0 w-full h-full flex justify-center items-center bg-dimmed-overlay z-3",
  ),
  icon: {
    plus: (isDragActive?: boolean) =>
      cn(
        "m-auto w-[24px] h-[24px] stroke-gray-400",
        "tablet:w-[48px] tablet:h-[48px]",
        isDragActive ? "stroke-gray-200" : "",
      ),
    cancel: cn("m-auto w-[36px] h-[36px] stroke-gray-100", "tablet:w-[40px] tablet:h-[40px]"),
  },
  errorMsg: cn("text-red-400 text-caption mt-2 block"),
};
