module.exports = {
  folder: {
    tasks: 'tasks',
    src: 'src',
    build: 'assets',
    prod: 'production'
  },
  task: {
    htmlHint: 'html-hint',
    jsHint: 'js-hint',
    buildJs: 'build-custom-js',
    buildJsVendors: 'build-js-vendors',
    buildSass: 'build-sass',
    buildSassProd: 'build-sass-production',
    buildStylesVendors: 'build-styles-vendors',
    imageMin: 'image-min',
    imageClean: 'image-clean',
    cleanProd: 'clean-production',
    copyFonts: 'copy-fonts',
    browserSync: 'browser-sync-server',
    watch: 'watch',
  }
};