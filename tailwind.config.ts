import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
        pink: {
          50: "var(--pink-50)",
          100: "var(--pink-100)",
          200: "var(--pink-200)",
          300: "var(--pink-300)",
          400: "var(--pink-400)",
          500: "var(--pink-500)",
          600: "var(--pink-600)",
          700: "var(--pink-700)",
          800: "var(--pink-800)",
          900: "var(--pink-900)",
        },
        red: {
          400: "var(--red-400)",
        },
        rose: {
          400: "var(--rose-400)",
        },
        orange: {
          400: "var(--orange-400)",
        },
        yellow: {
          400: "var(--yellow-400)",
        },
        green: {
          400: "var(--green-400)",
        },
        blue: {
          300: "var(--blue-300)",
          400: "var(--blue-400)",
        },
        purple: {
          400: "var(--purple-400)",
        },
        white: "var(--white)",
        black: "var(--black)",
        background: "var(--background)",
        "modal-frame": "var(--modal-frame)",
        "modal-dimmed": "var(--modal-dimmed)",
        gradient: "var(--gradient)",
      },
      fontSize: {
        caption: ["var(--fs-caption)", { lineHeight: "var(--lh-caption)" }],
        "body-xs": ["var(--fs-body-xs)", { lineHeight: "var(--lh-body-xs)" }],
        "body-s": ["var(--fs-body-s)", { lineHeight: "var(--lh-body-s)" }],
        "body-m": ["var(--fs-body-m)", { lineHeight: "var(--lh-body-m)" }],
        "body-l": ["var(--fs-body-l)", { lineHeight: "var(--lh-body-l)" }],
        modal: ["var(--fs-heading-modal)", { lineHeight: "var(--lh-heading-modal)" }],
        "heading-s": ["var(--fs-heading-s)", { lineHeight: "var(--lh-heading-s)" }],
        "heading-m": ["var(--fs-heading-m)", { lineHeight: "var(--lh-heading-m)" }],
        "heading-l": ["var(--fs-heading-l)", { lineHeight: "var(--lh-heading-l)" }],
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      screens: {
        mobile: "375px",
        tablet: "744px",
        desktop: "1200px",
      },
      boxShadow: {
        xl: "0 25px 50px 0 rgba(0,0,0,0.25)",
        floating: "0 5px 5px 0 rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {},
  },
};
export default config;
