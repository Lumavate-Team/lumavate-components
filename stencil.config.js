const { sass } = require('@stencil/sass');
const { postcss } = require('@stencil/postcss');
const autoprefixer = require('autoprefixer');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');

exports.config = {
  namespace: 'lumavate-components',
  outputTargets: [
    { type: 'dist' },
    { type: 'www' }
  ],
  globalStyle: 'src/global/index.scss',
  plugins: [
    sass({
      includePaths: ['./node_modules'],
      injectGlobalPaths: [  'src/global/mixins.scss' ]
    }),
    postcss({
      plugins: [autoprefixer()]
    }),
    builtins(),
    globals()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
