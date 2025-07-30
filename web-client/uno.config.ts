import { defineConfig, presetMini } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  },
  presets: [presetMini()],
  rules: [
    [
      "semi-border-color",
      {
        "border-color": "var(--semi-color-border)",
        "box-shadow": "var(--semi-shadow-elevated)",
      },
    ],
  ],
});
