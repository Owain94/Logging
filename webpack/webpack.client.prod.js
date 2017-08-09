const path = require("path")
const glob = require("glob")
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
          "cdk-focused",
          "cdk-mouse-focused",
          "cdk-global-scrollblock",
          "cdk-global-overlay-wrapper",
          "cdk-overlay-pane",
          "cdk-overlay-backdrop",
          "cdk-overlay-container",
          "cdk-overlay-dark-backdrop",
          "cdk-overlay-backdrop-showing",
          "cdk-visually-hidden",
          "cdk-focus-trap-anchor",
          "mat-dialog-container",
          "mat-ripple-element"
        ]
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
