import cn from "@/lib/cn";

export const IMG_UPLOAD_STYLES = {
  wrapper: cn("relative ", "tablet:"),
  input: cn("w-full h-full object-cover"),
  image: cn("object-cover"),
  button: cn("absolute top-0 left-0 z-[3]"),
  icon: {
    plus: cn("w-[24px] h-[24px] text-gray-400", "tablet:w-6 tablet:h-6"),
    cancel: cn(""),
  },
  errorMsg: cn(""),
};
