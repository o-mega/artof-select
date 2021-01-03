import path from "path";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import clear from "rollup-plugin-clear";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@wessberg/rollup-plugin-ts";
import multiInput from "rollup-plugin-multi-input";
import url from "@rollup/plugin-url";
import babelConfig from "./babel.config";
import bundleScss from "rollup-plugin-bundle-scss";

const PACKAGE_ROOT_PATH = process.cwd();
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, "dist");

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "index.js",
        format: "cjs",
        exports: "auto",
        plugins: [terser()],
        assetFileNames: "[name][extname]",
      },
      {
        file: "index.esm.js",
        format: "esm",
        exports: "auto",
        assetFileNames: "[name][extname]",
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      clear({
        targets: [OUTPUT_DIR],
      }),
      multiInput(),
      url(),
      bundleScss(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      babel({
        ...babelConfig,
        extensions: [".ts", ".tsx"],
        babelHelpers: "bundled",
      }),
      nodeResolve(),
      commonjs(),
    ],
  },
];
