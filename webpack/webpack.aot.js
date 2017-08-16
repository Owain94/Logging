const { AotPlugin } = require("@ngtools/webpack")
const { webpack } = require("webpack")

const tsConfig = {
  test: "./tsconfig.spec.json",
  client: "./tsconfig.app.json",
  server: "./tsconfig.server.json"
}

const tsConfigAot = {
  test: "./tsconfig.spec.json",
  client: "./tsconfig.app.aot.json",
  server: "./tsconfig.server.aot.json"
}

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be client or server
 * @param {boolean} aot Enables/Disables AoT Compilation
 * @returns
 */
function getAotPlugin(platform, aot) {
  return new AotPlugin({
    "tsConfigPath": aot ? tsConfigAot[platform] : tsConfig[platform],
    "skipCodeGeneration": !aot
  })
}

module.exports = {
  getAotPlugin
}
