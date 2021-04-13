import flowEntry from "rollup-plugin-flow-entry";
import flow from "rollup-plugin-flow";
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import externalDeps from 'rollup-plugin-peer-deps-external'

export default {
  input: "src/index.js",
  output: {
    name: "useTagTruncator",
    file: "dist/react-use-tag-truncator.js",
    format: "cjs",
    sourcemap: true,
  },
  external: [ "react", "react-dom", "resize-observer-polyfill" ],
  plugins: [
    flowEntry({ mode: "strict-local" }),
    flow({ pretty: true }),
    babel(),
    externalDeps(),
    terser(),
  ],
};
