# webpack-organic-webcell-configurator

configure webpack.config.js to build organic frontend web cells

* Bundles DNA configuration loaded by organic-dna-loader
* then transforms a build branch so that organelles can be resolved required/bundled
* finally export the selected DNA and bundle it along with webpack

## API

### webcell(options, webpackConfig)

#### options

* `dnaSourcePaths` - Array, holds full paths to dna source directories to load
* `selectBranch` - String, dot notated branch path to select for inclusion into the bundle. 
Leave undefined to use the whole dna.
* `buildBranch` - String, branch name within selected dna to transform any organelle `source` property paths as `require`s
* `exportName` - String, defaults to `window.DNA` value which will be used to globally 
provide the bundled DNA
* `dnaMode` - String, indicates the mode which will be applied on the loaded DNA. 
Defaults to `process.env.CELL_MODE`

#### webpackConfig

* as `Object` - the usually exported webpack.config.js configuration object
* as `function webpackConfig (dna):<Promise>` - decorator function receives the whole loaded DNA
and returns webpack.config.js configuration object or a promise for it.

## usage

```
// webpack.config.js
const path = require('path')
const webcell = require('webpack-organic-webcell-configurator')
const BUILD_MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = webcell({
  dnaSourcePaths: [
    path.join(__dirname, 'dna')
  ],
  buildBranch: 'build',
  selectBranch: 'cells.frontend-cell',
  exportName: 'window.DNA',
  dnaMode: BUILD_MODE
}, {
  mode: BUILD_MODE,
  entry: './main.js'
})
```

### webpackConfig argument as function

```
module.exports = webcell(options, function (dna) { 
  return webpackConfig 
})
```

### webpackConfig argument as Promise/async function

```
module.exports = webcell(options, async function (dna) { 
  // ... await async operations
  return webpackConfig 
})
```
