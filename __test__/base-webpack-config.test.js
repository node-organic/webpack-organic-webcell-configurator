const build = require('../index')
const path = require('path')

test('works with plain json', async () => {
  let result = await build({
    dnaSourcePaths: [
      path.join(__dirname, 'webcell', 'dna')
    ],
    basedir: path.join(__dirname, 'webcell'),
    buildBranch: 'build',
    exportName: 'global.DNA'
  }, {
    mode: 'development',
    entry: './main.js'
  })
  expect(result.entry).toBe('./main.js')
  expect(result.plugins.length).toBe(1)
})

test('works with decorator function', async () => {
  let result = await build({
    dnaSourcePaths: [
      path.join(__dirname, 'webcell', 'dna')
    ],
    basedir: path.join(__dirname, 'webcell'),
    buildBranch: 'build',
    exportName: 'global.DNA'
  }, function (dna) {
    return {
      mode: 'development',
      entry: dna.build.organelle.dnaKey1
    }
  })
  expect(result.entry).toBe('test')
  expect(result.plugins.length).toBe(1)
})

test('works with Promise result from function', async () => {
  let result = await build({
    dnaSourcePaths: [
      path.join(__dirname, 'webcell', 'dna')
    ],
    basedir: path.join(__dirname, 'webcell'),
    buildBranch: 'build',
    exportName: 'global.DNA'
  }, function (dna) {
    return new Promise((resolve, reject) => {
      resolve({
        mode: 'development',
        entry: dna.build.organelle.dnaKey1
      })
    })
  })
  expect(result.entry).toBe('test')
  expect(result.plugins.length).toBe(1)
})

test('works with async function', async () => {
  let result = await build({
    dnaSourcePaths: [
      path.join(__dirname, 'webcell', 'dna')
    ],
    basedir: path.join(__dirname, 'webcell'),
    buildBranch: 'build',
    exportName: 'global.DNA'
  }, async function (dna) {
    return {
      mode: 'development',
      entry: dna.build.organelle.dnaKey1
    }
  })
  expect(result.entry).toBe('test')
  expect(result.plugins.length).toBe(1)
})
