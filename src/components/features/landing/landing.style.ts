import { cva } from "class-variance-authority";

export const introContainer = [
  "flex flex-col text-center ",
  "px-[1.25rem] tablet:px-6 ",
  "gap-4 tablet:gap-10 pt-10 tablet:pt-24",
].join("");
export const introWaveWrapper =
  "overflow-hidden relative pb-8 mobile:pb-[50px] tablet:pb-[80px] desktop:pb-[150px]";
export const introWave = [
  "w-full h-[60px] absolute left-0 bottom-0 z-[1] ",
  "border border-transparent bg-repeat-x bg-[auto_60px] ",
  "mobile:h-[90px] mobile:bg-[auto_90px] ",
  "tablet:h-[140px] tablet:bg-[auto_140px] ",
  "desktop:h-[250px] desktop:bg-[auto_250px] ",
].join("");
export const sectionWrapper = "py-10 tablet:py-24";
export const sectionTitle = "text-center text-3xl tablet:text-5xl font-bold break-keep";
export const sectionTitleGradient = cva("bg-gradient-to-r bg-clip-text text-transparent", {
  variants: {
    color: {
      orangeRose: "from-orange-400 to-rose-400",
      pinkYellow: "from-pink-400 to-yellow-400",
      orangeGreen: "from-[#E98744] to-[#64992E]",
      purplePink: "from-purple-400 to-pink-400",
    },
  },
});
export const sectionInnerContainer = cva("mx-auto max-w-[760px] flex", {
  variants: {
    layout: {
      problem: "flex-col items-center gap-10 pt-10 tablet:pt-24",
      whyPlango: "flex-col",
      solution: "flex-col gap-10 pt-10 tablet:gap-20 tablet:pt-24",
      dailySummary:
        "flex-col tablet:flex-row tablet:flex-nowrap items-center gap-10 tablet:gap-18 justify-center max-w-[1028px]",
    },
  },
});
export const sectionDescription =
  "mt-6 text-center text-base tablet:text-xl text-gray-200 break-keep";

export const sectionContentBox = cva("flex flex-col rounded-3xl border p-5 tablet:p-6", {
  variants: {
    color: {
      gray: "border-gray-700 bg-[#1e293b94]",
      orange: "border-orange-200 bg-orange-800",
      green: "border-green-200 bg-green-800",
      blue: "border-blue-200 bg-blue-800",
      purple: "border-purple-200 bg-purple-800",
      pink: "border-pink-200 bg-[#5a14284d]",
    },
    layout: {
      problem:
        "w-full tablet:max-w-[360px] gap-2 tablet:gap-4 text-center odd:mr-auto even:ml-auto",
      solution: "flex flex-1 gap-3 tablet:gap-6 ",
      whyPlango: "p-3 rounded-2xl  tablet:rounded-3xl",
    },
  },
});

export const sectionContentTitle = cva("text-lg tablet:text-2xl text-gray-100 break-keep", {
  variants: {
    theme: {
      problem: "font-bold",
      solution: "font-semibold flex flex-1 items-center gap-2",
    },
  },
});

export const problemContent = cva("text-2xl text-gray-100", {
  variants: {
    theme: {
      title: "text-2xl text-gray-100 font-bold",
      solution: "font-semibold",
    },
  },
});

export const progressbar = cva("w-full h-3 rounded-xl ", {
  variants: {
    gradient: {
      orange: "bg-[linear-gradient(to_right,var(--orange-200),var(--orange-800)_80%)]",
      blue: "bg-[linear-gradient(to_right,var(--blue-200),var(--blue-800)_73%)]",
      green: "bg-[linear-gradient(to_right,var(--green-200),var(--green-800)_85%)]",
      purple: "bg-[linear-gradient(to_right,var(--purple-200),var(--purple-800)_91%)]",
    },
    text: {
      orange: "text-orange-200",
      blue: "text-blue-200",
      green: "text-green-200",
      purple: "text-purple-200",
    },
  },
});
export const summaryText = "text-center text-base hidden tablet:block text-gray-100";
