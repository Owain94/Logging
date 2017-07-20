const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const url = require("postcss-url");
const webpack = require("webpack");

const { LoaderOptionsPlugin } = require("webpack");
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
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "module": {
    "rules": [
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
        "loader": "file-loader?name=[name].[ext]"
      },
      {
        "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/assets/css/foundation.css")
        ],
        "test": /\.css$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"minimize\":true,\"importLoaders\":1}",
          "postcss-loader?{\"postcss\": {}}"
        ]
      },
      {
        "test": /\.scss$|\.sass$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader?{\"postcss\": {}}",
          "sass-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/assets/css/styles.styl")
        ],
        "test": /\.styl$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"minimize\":true,\"importLoaders\":1}",
          "postcss-loader?{\"postcss\": {}}",
          "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/assets/css/foundation.css")
        ],
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            "css-loader?{\"sourceMap\":false,\"minimize\":true,\"importLoaders\":1}",
            "postcss-loader?{\"postcss\": {}}"
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
            "css-loader?{\"sourceMap\":false,\"minimize\":true,\"importLoaders\":1}",
            "postcss-loader?{\"postcss\": {}}",
            "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
          ],
          "fallback": "style-loader",
          "publicPath": ""
        })
      }
    ]
  },
  "plugins": [
    new webpack.IgnorePlugin(/vertx/),
    new LoaderOptionsPlugin({
      "sourceMap": false,
      "options": {
        "postcss": [
          autoprefixer(),
          postcss()
            .use(
                url(
                  [
                    {
                      filter: "*", url: (URL) => {
                        if (!URL.startsWith("/")) {
                          return URL;
                        }
                        return `${URL}`.replace(/\/\/+/g, "/");
                      }
                    }
                  ]
                )
            )
        ],
        "context": ""
      }
    }),
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
};
