function SuppressExtractedTextChunksWebpackPlugin() {}

SuppressExtractedTextChunksWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin("compilation", function (compilation) {
    const cssOnlyChunks = []
      const entryPoints = compilation.options.entry
      for (const entryPoint of Object.keys(entryPoints)) {
        if (entryPoints[entryPoint].every((el) =>
          el.match(/\.(css|scss|sass|less|styl)$/))) {
            cssOnlyChunks.push(entryPoint)
        }
      }
    compilation.plugin("after-seal", (callback) => {
      compilation.chunks
        .filter((chunk) => cssOnlyChunks.indexOf(chunk.name) !== -1)
        .forEach((chunk) => {
          const newFiles = []
          chunk.files.forEach((file) => {
            if (file.match(/\.js(\.map)?$/)) {
              delete compilation.assets[file]
            } else {
              newFiles.push(file)
            }
          })
          chunk.files = newFiles
        })
      callback()
    })
    compilation.plugin("html-webpack-plugin-alter-asset-tags",
      (htmlPluginData, callback) => {
        const filterFn = (tag) =>
          !(tag.tagName === "script" && tag.attributes.src.match(/\.css$/))
        htmlPluginData.head = htmlPluginData.head.filter(filterFn)
        htmlPluginData.body = htmlPluginData.body.filter(filterFn)
        callback(null, htmlPluginData)
      })
  })
}

module.exports = SuppressExtractedTextChunksWebpackPlugin