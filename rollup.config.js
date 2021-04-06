import flowEntry from "rollup-plugin-flow-entry";
import flow from "rollup-plugin-flow";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: [
    {
      name: "useTagTruncator",
      file: "dist/react-use-tag-truncator.js",
      format: "umd",
    },
  ],
  plugins: [
    flowEntry({ mode: "strict-local" }),
    flow({ pretty: true }),
    commonjs(),
  ],
  external: [ "react", "react-dom", "resize-observer-polyfill" ],
};
