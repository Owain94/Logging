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
  }
};
