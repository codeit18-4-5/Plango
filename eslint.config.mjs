import js from "@eslint/js";
import tsparser from "@typescript-eslint/parser";
import tsplugin from "@typescript-eslint/eslint-plugin";
import storybook from "eslint-plugin-storybook";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: "readonly",
        __dirname: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
    plugins: { "@typescript-eslint": tsplugin },
    rules: {
      ...tsplugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    plugins: { storybook },
    rules: {
      "storybook/no-deprecated": "warn",
      "storybook/no-empty-story": "error",
    },
  },
  prettierConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"],
  },
];
