const sass = require('@stencil/sass');

exports.config = {
  namespace: 'lumavate-components',
  generateDistribution: true,
  serviceWorker: false,
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
