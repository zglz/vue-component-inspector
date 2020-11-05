const path = require('path')
const buble = require('rollup-plugin-buble')
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const version = process.env.VERSION || require('../package.json').version
const vue = require('rollup-plugin-vue');
const terser = require("rollup-plugin-terser");
const banner =
`/*!
  * vue-component-inspector v${version}
  * (c) ${new Date().getFullYear()} zhanggaungliang
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser dev
  {
    file: resolve('dist/vue-component-inspector.js'),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve('dist/vue-component-inspector.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve('dist/vue-component-inspector.common.js'),
    format: 'cjs'
  },
  {
    file: resolve('dist/vue-component-inspector.esm.js'),
    format: 'es'
  },
  {
    file: resolve('dist/vue-component-inspector.esm.browser.js'),
    format: 'es',
    env: 'development',
    transpile: false
  },
  {
    file: resolve('dist/vue-component-inspector.esm.browser.min.js'),
    format: 'es',
    env: 'production',
    transpile: false
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('src/index.js'),
      plugins: [
        flow(),
        node(),
        cjs(),
        vue(),
        // babel(),
        replace({
          __VERSION__: version
        }),
        terser.terser()

      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'vueComponentInspector',
      sourceMap: false
    },

  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    // config.input.plugins.push(buble())
  }

  return config
}
