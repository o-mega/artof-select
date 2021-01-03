import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import clear from "rollup-plugin-clear";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@wessberg/rollup-plugin-ts";
import bundleScss from "rollup-plugin-bundle-scss";

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "auto",
        plugins: [
          terser(),
        ],
        assetFileNames: "dist/[name][extname]"
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        exports: "auto"
      }
    ],
    external: [
      "react",
      "react-dom",
      "react-merge-refs",
      "react-popper"
    ],
    plugins: [
      clear({
        targets: ["./dist"]
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
    ]
  }
];
