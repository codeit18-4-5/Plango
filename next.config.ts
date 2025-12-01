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
        include: path.resolve(__dirname, "src/assets/icons"),
        resourceQuery: { not: /url/ },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              configFile: "./svgr.config.js",
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, "src/assets/landing"),
        resourceQuery: { not: /url/ },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: false,
              dimensions: false,
              svgo: true,
              svgoConfig: {
                plugins: [
                  "preset-default",
                  { name: "removeDimensions", active: true },
                  { name: "convertPathData", active: true },
                  { name: "cleanupIDs", active: true },
                  { name: "removeUnusedNS", active: true },
                ],
              },
            },
          },
        ],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
