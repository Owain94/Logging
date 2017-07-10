const path = require("path");
const glob = require("glob");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

/**
 * This is a client prod config which should be merged on top of common config
 */
module.exports = {
  "plugins": [
    new PurifyCSSPlugin({
      "paths": glob.sync(
        path.join(process.cwd(), "src/app/**/*.pug"),
        path.join(process.cwd(), "src/app/**/*.html")
      ),
      "minimize": true,
      "purifyOptions": {
        "whitelist": []
      }
    }),
    new CompressionPlugin({
      "asset": "[path].gz[query]",
      "algorithm": "gzip",
      "test": /\.js$|\.css$/,
      "threshold": 1024,
      "minRatio": 0.8
    }),
    new BrotliPlugin({
      "asset": "[path].br[query]",
      "test": /\.js$|\.css$/,
      "threshold": 1024,
      "minRatio": 0.8
    })
  ]
};
