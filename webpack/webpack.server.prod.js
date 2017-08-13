const webpack = require("webpack")
const PurifyPlugin = require("@angular-devkit/build-optimizer").PurifyPlugin
const OptimizeJsPlugin = require("optimize-js-plugin")
/**
 * This is a server prod config which should be merged on top of common config
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
    new PurifyPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      "mangle": {
        "keep_fnames": true,
        "screw_ie8": true
      },
      "compress": {
        "warnings" : false,
        "conditionals": true,
        "unused": true,
        "comparisons": true,
        "sequences": true,
        "dead_code": true,
        "evaluate": true,
        "if_return": true,
        "join_vars": true,
        "negate_iife": false,
        "screw_ie8": true,
        "pure_getters": true
      },
      "comments": false
    }),
    new OptimizeJsPlugin({
      "sourceMap": false
    })
  ]
}
