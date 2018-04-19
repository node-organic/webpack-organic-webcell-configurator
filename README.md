# webpack-organic-webcell-configurator

configure webpack.config.js to build organic webcells

## usage

```
// webpack.config.js
const path = require('path')
const webcell = require('webpack-organic-webcell-configurator')

const options = {
  dnaSourcePaths: [
    path.join(__dirname, 'dna')
  ],
  buildBranch: 'build',
  exportName: 'window.DNA'
}

const webpackConfig = {
  mode: 'development',
  entry: './main.js'
}

module.exports = webcell(options, webpackConfig)
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
