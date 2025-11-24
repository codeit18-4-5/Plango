import cn from "@/lib/cn";

const LAYOUT_GAP = "grid gap-y-[24px] tablet:gap-y-[32px] desktop:gap-y-[40px]";

export const ARTICLE_COMMON_STYLES = {
  main: {
    wrapper: cn(LAYOUT_GAP, "pb-[50px] tablet:pb-[67px] desktop:pb-[117px]"),
    title: "text-heading-m text-gray-100",
  },
  section: {
    contents: "relative",
  },
  dropdown: {
    wrapper: cn("text-body-xs", "tablet:text-body-s tablet:w-[120px]"),
    trigger: "tablet:h-[44px] tablet:p-[10px_14px]",
    icon: "w-[24px]",
    option: "tablet:p-[10px_14px]",
  },
  card: {
    content: cn("tablet:min-h-[72px]"),
  },
  empty: {
    form: "flex h-dvh flex-col items-center justify-center gap-[30px]",
  },
};

export const ARTICLE_LIST_STYLES = {
  section: {
    wrapper: LAYOUT_GAP,
    heading: {
      wrapper: "flex items-center justify-between gap-x-[10px]",
      title: "text-heading-s text-gray-100",
      moreHref: cn(
        "text-body-xs text-gray-400 duration-200",
        "hover:text-gray-300",
        "tablet:text-body-s",
      ),
    },
    grid: {
      best: cn(
        "grid grid-cols-1 gap-[16px]",
        "tablet:grid-cols-2 tablet:gap-[16px]",
        "desktop:grid-cols-3 desktop:gap-[20px]",
      ),
      all: cn(
        "grid gap-[16px]",
        "tablet:gap-[16px]",
        "desktop:grid-cols-2 desktop:gap-[20px_20px]",
      ),
      none: "",
    },
  },
};

export const ARTICLE_LIST_EMPTY_STYLES = {
  wrapper: "w-full p-[30px_0] text-center text-base text-gray-500 tablet:p-[70px_0]",
};

export const ARTICLE_FORM_STYLES = {
  section: {
    heading: {
      wrapper: cn(
        "border-b border-gray-600 pb-[24px] text-gray-100",
        "[&>h2]:text-heading-m [&>h3]:text-heading-s",
        "tablet:pb-[32px]",
        "desktop:pb-[40px] tablet:flex tablet:justify-between tablet:items-center",
      ),
      actions: cn(
        "fixed bottom-0 left-0 w-full z-20 p-[0px_16px_30px_16px]",
        "after:z-2 after:pointer-events-none after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[calc(100%_+_60px)] after:bg-[linear-gradient(0deg,var(--background)_54%,transparent_100%)]",
        "tablet:relative tablet:p-0 tablet:after:hidden",
      ),
      submit: cn("relative z-10", "tablet:min-w-[184px]"),
    },
  },
  form: {
    wrapper: LAYOUT_GAP,
    field: {
      textarea: "h-[240px]",
    },
  },
};

export const ARTICLE_DETAIL_STYLES = {
  wrapper: cn(LAYOUT_GAP, "break-word"),
  heading: {
    wrapper: cn(
      "pt-[24px] flex justify-between border-b border-gray-600 pb-[16px] mb-[16px] gap-x-4",
    ),
    title: cn("text-[16px]", "tablet:text-[18px]"),
    kebab: cn("w-[24px] h-[24px] text-gray-500 block text-body-s", "tablet:text-base"),
  },
  meta: {
    wrapper: cn("flex flex-wrap items-center justify-between text-body-s gap-2"),
    authorInfo: cn("flex items-center gap-x-4"),
    stats: cn("flex items-center gap-x-[8px] [&>span]:text-gray-400", "tablet:gap-x-[16px]"),
    icon: "mt-[-2px] w-[16px] h-[16px] inline-block align-middle mr-[4px]",
    timeStamp: cn(
      "text-gray-400",
      "before:content-[''] before:inline-block before:w-[1px] before:h-[12px] before:bg-gray-700 before:mr-4",
    ),
  },
  content: "p-[50px_0] text-body-m text-gray-300 whitespace-pre-line",
  actions: {
    wrapper: "text-base flex items-center gap-x-[20px] justify-between",
    like: cn(
      "text-gray-500 flex items-center gap-x-2 [&>button]:w-[22px] [&>button]:h-[22px] [&>*]:text-gray-400 [&>button]:duration-200",
      "tablet:[&>button]:w-[28px] tablet:[&>button]:h-[28px]",
    ),
    backToList: cn("px-6", "tablet:h-12 tablet:min-w-[176px] tablet:text-body-m"),
  },
};

export const ARTICLE_COMMENT_STYLES = {
  section: {
    heading: {
      title: cn("text-heading-s [&>b]:text-pink-400 mb-[16px]", "tablet:mb-[24px]"),
    },
  },
  replyList: cn(
    "grid gap-y-[16px] mt-[32px] pt-[32px] border-t border-gray-600",
    " tablet:mt-[40px] tablet:pt-[40px]",
  ),
};
