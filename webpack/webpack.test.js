const path = require("path");
const webpack = require("webpack");

const { AotPlugin } = require("@ngtools/webpack");

module.exports = {
  "devtool": "inline-source-map",
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules"
    ]
  },
  "module": {
    "rules": [
      {
        enforce: "post",
        test: /\.(js|ts)$/,
        loader: "istanbul-instrumenter-loader",
        include: path.join(process.cwd(), "src"),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  "plugins": [
    new AotPlugin({
      "tsConfigPath": path.join(process.cwd(), "tsconfig.spec.json"),
      "mainPath": path.join(process.cwd(), "src/bootstrap/main.ts")
    }),
    new webpack.SourceMapDevToolPlugin({
      "filename": null, 
      "test": /\.(ts|js)($|\?)/i
    })
  ],
  "node": {
    "process": false
  }
};
