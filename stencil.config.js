const sass = require('@stencil/sass');

exports.config = {
  namespace: 'lumavate-components',
  outputTargets: [
    { type: 'dist' },
    { type: 'www' }
  ],
  plugins: [
    sass({
      injectGlobalPaths: [ 'src/global/index.scss' ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
