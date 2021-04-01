import flowEntry from "rollup-plugin-flow-entry";
import flow from "rollup-plugin-flow";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  plugins: [
    flowEntry({ mode: "strict-local" }),
    flow({ pretty: true }),
    commonjs(),
  ],
  external: [ "react", "react-dom", "resize-observer-polyfill" ],
};
