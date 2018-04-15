const path = require('path')
const execa = require('execa')

test('builds successfully', async () => {
  let webpackCmd = path.join(process.cwd(), 'node_modules', '.bin', 'webpack')
  let result = await execa.shell(webpackCmd, {
    cwd: path.join(__dirname, 'webcell')
  })
  expect(result.stderr).toBe('')
  expect(result.code).toBe(0)
  require('./webcell/dist/main')
  expect(global.DNA).toBeDefined()
  expect(typeof global.DNA.build.organelle.source).toBe('function')
})
