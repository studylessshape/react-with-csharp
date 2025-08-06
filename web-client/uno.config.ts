import { defineConfig, presetMini } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  },
  presets: [presetMini()],
  rules: [
    ["semi-border-color", { "border-color": "var(--semi-color-border)" }],
    ["semi-shadow-elevated", { "box-shadow": "var(--semi-shadow-elevated)" }],
    ["semi-color-bg-1", { "background-color": "var(--semi-color-bg-1)" }],
    ["scrollbar-gutter-stable", { "scrollbar-gutter": "stable" }],
  ],
});
