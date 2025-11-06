import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
const twMergeCustom = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "modal",
            "body-xs",
            "body-s",
            "body-m",
            "body-l",
            "heading-s",
            "heading-m",
            "heading-l",
          ],
        },
      ],
    },
  },
});

const cn = (...classNames: ClassValue[]) => {
  return twMergeCustom(clsx(classNames));
};

export default cn;
