const loadDNA = require('organic-dna-loader')
const InjectPlugin = require('webpack-inject-plugin').default
const resolveModule = require('resolve')
const selectBranch = require('organic-dna-branches').selectBranch

const resolveModulePath = async function (modulepath, options) {
  let basedir = options.basedir || process.cwd()
  return new Promise((resolve, reject) => {
    resolveModule(modulepath, {
      basedir: basedir
    }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

const renderDNA = async function (dna, options) {
  let buildBranch = options.buildBranch || 'build'
  let exportName = options.exportName || 'window.DNA'
  let dnaImpl = JSON.stringify(dna)
  for (let key in dna[buildBranch]) {
    let value = `"${dna[buildBranch][key].source}"`
    let fullpath = await resolveModulePath(dna[buildBranch][key].source, options)
    let replacement = `require('${fullpath}')`
    dnaImpl = dnaImpl.replace(new RegExp(value, 'g'), replacement)
  }
  return `(function () {${exportName} = ${dnaImpl}})()`
}

module.exports = async function (options, baseWebpackConfig) {
  if (!options.dnaSourcePaths && !options.dnaLoader) throw new Error('dnaSourcePaths or dnaLoader not provided in options')
  return new Promise(async (resolve, reject) => {
    let dna
    if (options.dnaLoader) {
      dna = await options.dnaLoader(options.dnaMode || process.env.CELL_MODE)
    } else {
      dna = await loadDNA({
        dnaSourcePaths: options.dnaSourcePaths,
        dnaMode: options.dnaMode || process.env.CELL_MODE
      })
    }
    let clientDNA = dna
    if (options.selectBranch) {
      clientDNA = selectBranch(dna, options.selectBranch)
    }
    if (typeof options.transformBranch === 'function') {
      clientDNA = await options.transformBranch(clientDNA)
    }
    let result = await renderDNA(clientDNA, options)
    if (typeof baseWebpackConfig === 'function') {
      baseWebpackConfig = baseWebpackConfig(dna)
      if (baseWebpackConfig instanceof Promise) {
        baseWebpackConfig = await baseWebpackConfig.then()
      }
    }
    baseWebpackConfig.plugins = baseWebpackConfig.plugins || []
    baseWebpackConfig.plugins.push(new InjectPlugin(function () {
      return result
    }))
    resolve(baseWebpackConfig)
  })
}
