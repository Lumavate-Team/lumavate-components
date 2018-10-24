const { sass } = require('@stencil/sass');
const { postcss } = require('@stencil/postcss');
const autoprefixer = require('autoprefixer');

exports.config = {
  namespace: 'lumavate-components',
  outputTargets: [
    { type: 'dist' },
    { type: 'www' }
  ],
  globalStyle: 'src/global/index.scss',
  plugins: [
    sass({
      injectGlobalPaths: [  'src/global/mixins.scss' ]
    }),
    postcss({
      plugins: [autoprefixer()]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
