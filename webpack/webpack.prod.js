const webpack = require("webpack")
const OptimizeJsPlugin = require("optimize-js-plugin")

/**
 * This is a prod config to be merged with the Client config
 */
module.exports = {
  "plugins": [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OptimizeJsPlugin({
      "sourceMap": false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
}
