const ngtools = require("@ngtools/webpack");
const webpackMerge = require("webpack-merge");
const commonPartial = require("./webpack/webpack.common");
const clientPartial = require("./webpack/webpack.client");
const clientProdPartial = require("./webpack/webpack.client.prod");
const serverPartial = require("./webpack/webpack.server");
const serverProdPartial = require("./webpack/webpack.server.prod");
const devPartial = require("./webpack/webpack.dev");
const prodPartial = require("./webpack/webpack.prod");
const testPartial = require("./webpack/webpack.test");
const { getAotPlugin } = require("./webpack/webpack.aot");

module.exports = function (options, webpackOptions) {
  options = options || {};

  console.log(`Running build for ${options.client ? "client" : options.server ? "server" : "test"} with ${options.aot ? "AoT" : "JiT"} compilation`);

  let serverConfig = webpackMerge({}, commonPartial, serverPartial, {
    plugins: [
      getAotPlugin("server", !!options.aot)
    ]
  });

  let clientConfig = webpackMerge({}, commonPartial, clientPartial, {
    plugins: [
      getAotPlugin("client", !!options.aot)
    ]
  });

  let testConfig = webpackMerge({}, commonPartial, testPartial);

  if (options.aot) {
    clientConfig = webpackMerge({}, clientConfig, webpackMerge({}, clientProdPartial, prodPartial));
    serverConfig = webpackMerge({}, serverConfig, webpackMerge({}, serverProdPartial, prodPartial));
  } else {
    clientConfig = webpackMerge({}, clientConfig, devPartial);
    serverConfig = webpackMerge({}, serverConfig, devPartial);
    testConfig = webpackMerge({}, testConfig, devPartial);
  }

  const configs = [];
  if (options.client) {
    configs.push(clientConfig);
  } else if (options.server) {
    configs.push(serverConfig);
  } else if (options.test) {
    configs.push(testConfig);
  }

  return configs;
};
