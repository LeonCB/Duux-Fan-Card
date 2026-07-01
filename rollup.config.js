import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/duux-fan-card.ts",
  output: {
    file: "dist/duux-fan-card.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    json(),
    terser({ format: { comments: false } }),
  ],
};
