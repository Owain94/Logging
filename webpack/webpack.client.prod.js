const path = require("path")
const glob = require("glob")
const webpack = require("webpack")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")
const PurifyPlugin = require("@angular-devkit/build-optimizer").PurifyPlugin
const SubresourceIntegrityPlugin = require("webpack-subresource-integrity")

/**
 * This is a client prod config which should be merged on top of common config
 */
module.exports = {
  "module": {
    "rules": [
      {
        "test": /\.js$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          },
          "@ngtools/webpack"
        ]
      }
    ]
  },
  "output": {
    "crossOriginLoading": "anonymous"
  },
  "plugins": [
    new PurifyPlugin(),
    new PurifyCSSPlugin({
      "paths": glob.sync(
        path.join(process.cwd(), "src/app/**/*.pug"),
        path.join(process.cwd(), "src/app/**/*.html")
      ),
      "minimize": true,
      "purifyOptions": {
        "whitelist": [
          "stop-scrolling",
          "mark",
        ]
      }
    }),
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
      "output": {
        "ascii_only": true,
        "comments": false
      }
    }),
    new FaviconsWebpackPlugin({
      "appName": "Logging",
      "appDescription": "Logging",
      "developerName": "Owain van Brakel",
      "developerURL": "https://www.owain.nl",
      "background": "#c00502",
      "theme_color": "#990000",
      "display": "standalone",
      "version": "1.0",
      "logging": false,
      "online": false,
      "preferOnline": false,
      "start_url": "/",
      "logo": "src/assets/img/icon.png",
      "prefix": "assets/icons/",
      "emitStats": false,
      "persistentCache": true,
      "inject": true,
      "title": "Logging",
      "icons": {
        "android": true,
        "appleIcon": true,
        "appleStartup": false,
        "coast": false,
        "favicons": true,
        "firefox": true,
        "opengraph": true,
        "twitter": true,
        "yandex": true,
        "windows": true
      }
    }),
    new SubresourceIntegrityPlugin({
      "hashFuncNames": ["sha256", "sha384"]
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
}
