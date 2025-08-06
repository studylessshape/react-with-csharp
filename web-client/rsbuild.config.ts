import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import path from "node:path";

export default defineConfig({
  plugins: [pluginReact(), pluginLess(), pluginSvgr()],
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: "react",
          autoCodeSplitting: true,
        }),
      ],
      module: {
        rules: [
          {
            test: /\.less$/,
            use: ["less-loader"],
            type: "css/auto",
          },
          {
            test: /\.less$/,
            type: "javascript/auto",
          },
        ],
      },
      experiments: {
        css: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  html: {
    title: "",
  },
  resolve: {
    alias: [
      {
        "@": path.resolve(__dirname, "./src"),
        "@src": path.resolve(__dirname, "./src"),
      },
    ],
  },
});
