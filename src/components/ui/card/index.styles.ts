import cn from "@/lib/cn";

export const CARD_WRAPPER_STYLES = {
  wrapper: (link: boolean, className?: string) =>
    cn(
      "relative bg-gray-800 border border-gray-700 rounded-lg p-[24px_16px]",
      "tablet:p-[20px_32px]",
      { "p-0 tablet:p-0": link },
      className,
    ),
  inner: cn("relative block p-[24px_16px]", "tablet:p-[20px_32px]"),
};

export const CARD_BADGE_STYLES = {
  wrapper: cn("flex items-center gap-x-[4px] text-body-m mb-[14px]"),
  icon: cn("w-[16px] h-[16px] block mt-[-3px]", "mt-[-5px]"),
};

export const CARD_CONTENT_STYLES = {
  wrapper: cn("grid grid-cols-[auto_auto] justify-between items-start gap-x-[16px]"),
  title: cn("min-h-[48px] text-body-l break-word line-clamp-2", "tablet:min-h-[56px]"),
  image: {
    wrapper: cn(
      "relative w-[64px] h-[64px] rounded-[8px] overflow-hidden bg-gray-700 flex items-center justify-center",
      "tablet:w-[72px] tablet:h-[72px]",
    ),
    icon: cn("w-[32px] h-[32px]", "tablet:w-[40px] tablet:h-[40px]"),
  },
};

export const CARD_INFO_STYLES = {
  wrapper: (action: boolean) =>
    cn("flex items-end justify-between mt-[16px]", "tablet:mt-[24px] tablet:items-center", {
      "pr-[24px] tablet:pr-0": action,
    }),
  meta: {
    wrapper: cn("grid", "tablet:flex tablet:items-center tablet:gap-x-[12px]"),
    writer: cn("flex items-center gap-x-[12px] order-2"),
    avatar: cn("w-[32px] h-[32px]"),
    nickname: cn("text-[12px] text-gray-100", "tablet:text-[14px]"),
    time: cn(
      "text-[12px] text-gray-400 mb-[16px] order-1 block",
      "tablet:before:relative tablet:order-3 tablet:text-[14px] tablet:mb-0 tablet:before:content-[''] tablet:before:inline-block tablet:before:w-[1px] tablet:before:h-[12px] tablet:before:bg-gray-700 tablet:before:mr-[12px] tablet:before:top-[1px]",
    ),
  },
  like: {
    wrapper: cn("flex items-center text-[12px] gap-x-[4px]", "tablet:text-[14px] text-gray-400"),
    icon: cn("w-[16px] h-[16px] block"),
  },
};

export const CARD_ACTIONS_STYLES = {
  wrapper: cn(
    "absolute right-[16px] bottom-[18px] z-5",
    "tablet:top-[22px] tablet:right-[32px] tablet:bottom-auto",
  ),
  icon: cn("h-[16px] w-[16px] text-gray-500", "tablet:h-[24px] tablet:w-[24px]"),
};
