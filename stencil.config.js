const sass = require('@stencil/sass');

exports.config = {
  namespace: 'lumavate-components',
  generateDistribution: true,
  serviceWorker: false,
  plugins: [
    sass({
      injectGlobalPaths: [
    'src/global/index.scss' ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
