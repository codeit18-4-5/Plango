module.exports = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  printWidth: 100,
  arrowParens: "avoid",
  endOfLine: "lf",
  trailingComma: "all",
  jsxSingleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ["*.md", "*.mdx"],
      options: {
        proseWrap: "always",
        singleQuote: false,
      },
    },
  ],
};
