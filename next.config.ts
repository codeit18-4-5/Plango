import type { NextConfig } from "next";
import path from "path";
import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };

    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) => {
      return rule.test instanceof RegExp && rule.test.test(".svg");
    });

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default nextConfig;
