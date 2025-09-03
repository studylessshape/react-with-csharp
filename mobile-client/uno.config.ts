import { CSSObject, defineConfig, presetMini } from "unocss";
import console from "node:console";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  },
  presets: [presetMini()],
  rules: [
    [
      /^p(-t|-r|-b|-l|-x-|-y)?-inset-?([0-9]*)$/,
      ([, position, fallbackSize]) => {
        const fallback =
          fallbackSize.length == 0
            ? ""
            : `, calc(var(--spacing) * ${fallbackSize})`;
        if (position == "" || position == undefined) {
          return {
            padding: `env(safe-area-inset-top${fallback}) env(safe-area-inset-right${fallback}) env(safe-area-inset-bottom${fallback}) env(safe-area-inset-left${fallback})`,
          };
        } else {
          var result: CSSObject = {};
          if (position == "-t" || position == "-y") {
            result["padding-top"] = `env(safe-area-inset-top${fallback})`;
          } else if (position == "-r" || position == "-x") {
            result["padding-right"] = `env(safe-area-inset-right${fallback})`;
          } else if (position == "-b" || position == "-y") {
            result["padding-bottom"] = `env(safe-area-inset-bottom${fallback})`;
          } else if (position == "-l" || position == "-x") {
            result["padding-left"] = `env(safe-area-inset-left${fallback})`;
          }
          return result;
        }
      },
    ],
  ],
});
