import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index.ts",
    {
      builder: "mkdist",
      input: "./src/components/",
      outDir: "./dist/components",
    },
  ],
  outDir: "dist",
  declaration: true,
  rollup: {
    esbuild: {
      minify: true,
    },
  },
});
