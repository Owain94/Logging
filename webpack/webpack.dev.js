const webpack = require("webpack");

/**
 * This is a dev config to be merged with the Client config
 */
module.exports = {
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /\/node_modules\//
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      },
    ]
  },
  "plugins": [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
};
