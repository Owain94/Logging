const { SpecReporter } = require("jasmine-spec-reporter")

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    "./src/app/**/**.e2e.ts",
    "./src/app/**/*.e2e.ts"
  ],
  directConnect: false,
  baseUrl: "http://localhost:4200/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  capabilities: {
    "browserName": "phantomjs"
  },
  onPrepare() {
    require("ts-node").register({
      project: "./tsconfig.e2e.json"
    })
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }))
  }
}
