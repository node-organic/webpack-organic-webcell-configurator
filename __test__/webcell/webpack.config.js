const path = require('path')
const webcell = require('../../index')

module.exports = webcell({
  dnaSourcePaths: [
    path.join(__dirname, 'dna')
  ],
  buildBranch: 'build',
  exportName: 'global.DNA'
}, {
  mode: 'development',
  entry: './main.js'
})
