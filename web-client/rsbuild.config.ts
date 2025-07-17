import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";
import { pluginLess } from "@rsbuild/plugin-less";
import { ArcoDesignPlugin } from "@arco-plugins/unplugin-react";

export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: "react",
          autoCodeSplitting: true,
        }),
        new ArcoDesignPlugin({
          theme: "@arco-design/theme-line",
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
          }
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
});
