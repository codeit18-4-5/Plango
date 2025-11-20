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
  wrapper: "w-full p-[30px_0] text-center text-caption text-gray-500 tablet:p-[50px_0]",
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
