import cn from "@/lib/cn";

export const teamTitleStyle =
  "relative mb-[24px] flex h-[64px] w-full items-center justify-between rounded-[12px] bg-gray-600 bg-[url('/assets/images/img-thumbnail-team.svg')] bg-[bottom_right_80px] bg-no-repeat px-[24px]";

export const todoListStyle = cn(
  "relative mt-[16px] flex h-[40px] w-full items-center justify-between rounded-xl bg-gray-800 pl-6 pr-2",
  "before:absolute before:left-0 before:top-0 before:h-full before:w-3 before:rounded-l-xl before:content-['']",
);

export const TODO_COLORS = [
  "before:bg-purple-400",
  "before:bg-blue-400",
  "before:bg-blue-300",
  "before:bg-green-400",
  "before:bg-rose-400",
  "before:bg-orange-400",
  "before:bg-yellow-400",
];

export const reportText =
  "bg-gradient-to-r from-pink-700 to-pink-300 bg-clip-text text-transparent";

export const reportRightBox = {
  wrapper: "flex justify-between gap-2 rounded-xl bg-gray-700 p-3",
  textxs: "text-xs text-gray-300",
  text2xl: "text-2xl font-bold text-pink-300",
};
