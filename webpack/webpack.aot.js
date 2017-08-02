const { AotPlugin } = require("@ngtools/webpack");
const { webpack } = require("webpack");

const tsConfig = {
  test: "./tsconfig.spec.json",
  client: "./tsconfig.app.json",
  server: "./tsconfig.server.json"
};

const tsConfigAot = {
  client: "./tsconfig.app.json",
  server: "./tsconfig.server.aot.json"
};

const mainPath = {
  test: "./src/bootstrap/main.ts",
  client: "./src/bootstrap/main.ts",
  server: "./src/bootstrap/main.server.ts"
};

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be client or server
 * @param {boolean} aot Enables/Disables AoT Compilation
 * @returns
 */
function getAotPlugin(platform, aot) {
  return new AotPlugin({
    "mainPath": mainPath[platform],
    "tsConfigPath": aot ? tsConfigAot[platform] : tsConfig[platform],
    "skipCodeGeneration": !aot
  });
}

module.exports = {
  getAotPlugin
};
