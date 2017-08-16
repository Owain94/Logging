const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")

const { CommonsChunkPlugin } = require("webpack").optimize

const nodeModules = path.join(process.cwd(), "node_modules")
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"]

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  "entry": {
    "main": "./src/bootstrap/main.ts",
    "polyfills": "./src/polyfills/polyfills.browser.ts",
    "styles": "./src/assets/css/styles.styl",
    "webworker": "./src/bootstrap/main.worker.ts"
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js"
  },
  "target": "web",
  "plugins": [
    new webpack.optimize.CommonsChunkPlugin({
      "name": "main",
      "async": "common",
      "children": true,
      "minChunks": 2
    }),
    new CommonsChunkPlugin({
      "name": "inline",
      "minChunks": null,
      "chunks": [
        "main",
        "polyfills",
        "styles"
      ]
    }),
    new HtmlWebpackPlugin({
      "template": "./src/index.pug",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "cache": false,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [
        "webworker"
      ],
      "xhtml": true,
      "minify": {
        "caseSensitive": true,
        "collapseWhitespace": true,
        "keepClosingSlash": true
      },
      "excludeAssets": [/style.*.js/],
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0])
        let rightindex = entryPoints.indexOf(right.names[0])
        if (leftIndex > rightindex) {
            return 1
        } else if (leftIndex < rightindex) {
            return -1
        } else {
            return 0
        }
      }
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      "async": "main",
      "inline": "inline",
      "preload": ["main", "polyfills"]
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_PLATFORM": JSON.stringify("client")
    })
  ]
}
