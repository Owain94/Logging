const path = require("path")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")
const postcssUrl = require("postcss-url")
const postcssNext = require("postcss-cssnext")
const postcssReduceIdents = require("postcss-reduce-idents")
const postcssBrowserReporter = require("postcss-browser-reporter")
const postcssReporter = require("postcss-reporter")
const cssnano = require("cssnano")
const url = require("postcss-url")
const webpack = require("webpack")

const { LoaderOptionsPlugin } = require("webpack")
const { AotPlugin } = require("@ngtools/webpack")


const postcssPlugins = () => {
  return [
    postcssUrl([
      {
        filter: (asset) => asset.url.startsWith("/") && !asset.url.startsWith("//"),
        url: (asset) => `/${asset.url}`.replace(/\/\/+/g, "/")
      },
      {
        filter: (asset) => !(asset.absolutePath.endsWith(".svg") && asset.hash),
        url: "inline",
        maxSize: 10
      }
    ]),
    postcssNext({
      "warnForDuplicates": false
    }),
    postcssReduceIdents(),
    cssnano({
      "preset": [
        "default",
        { "autoprefixer": false },
        { "safe": true},
        {"discardComments": { "removeAll": true }}
      ]
    }),
    postcssBrowserReporter(),
    postcssReporter()
  ]
}

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
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
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
        "test": /\.json$/,
        "loader": "json-loader"
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(pug|jade)$/,
        "loaders": [
          "raw-loader",
          "pug-html-loader"
        ]
      },
      {
        "test": /\.(eot|svg)$/,
        "loader": "file-loader?name=[name].[hash:5].[ext]"
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:5].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/assets/css/foundation.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/assets/css/styles.styl")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            }
          ],
          "fallback": "style-loader",
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "src/assets/css/styles.styl")
        ],
        "test": /\.styl$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "stylus-loader",
              "options": {
                "sourceMap": false,
                "paths": []
              }
            }
          ],
          "fallback": "style-loader",
          "publicPath": ""
        })
      }
    ]
  },
  "plugins": [
    new webpack.IgnorePlugin(/vertx/),
    new ProgressBarPlugin(),
    new ExtractTextPlugin({
      "filename": "[name].bundle.css",
      "allChunks": true
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  }
}
