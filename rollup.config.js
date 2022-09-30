import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import clear from "rollup-plugin-clear";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-ts";
import bundleScss from "rollup-plugin-bundle-scss";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "auto",
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
        assetFileNames: "dist/[name][extname]",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        exports: "auto",
        plugins: [
          terser({
            compress: false,
            mangle: false,
            format: {
              comments: false,
              beautify: true,
              indent_level: 2,
            },
          }),
        ],
      },
    ],
    external: [
      "react",
      "react-dom",
      "react-merge-refs",
      "react-popper",
      "@popperjs",
      "@popperjs/core",
    ],
    plugins: [
      clear({
        targets: ["./dist"],
      }),
      bundleScss(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      babel({
        ...require("./babel.config"),
        extensions: [".ts", ".tsx"],
        babelHelpers: "bundled",
      }),
      nodeResolve(),
      commonjs(),
    ],
  },
];
