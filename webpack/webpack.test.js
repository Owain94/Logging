const path = require("path");
const webpack = require("webpack");

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
    new webpack.DefinePlugin({
      "process.env.NODE_PLATFORM": JSON.stringify("client")
    })
  ],
  "node": {
    "process": false
  }
};
