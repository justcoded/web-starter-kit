module.exports = {
  folder: {
    tasks: 'tasks',
    src: 'assets',
    build: 'public'
  },
  file: {
    mainHtml: 'index.html',
    mainJs: 'app.js',
    vendorJs: 'vendor.js',
    vendorJsMin: 'vendor.js',
    mainScss: 'style.scss',
    mainScssMin: 'styles.css',
    vendorScss: 'vendor.scss',
    vendorScssMin: 'vendor.css',
  },
  task: {
    htmlHint: 'html-hint',
    esLint: 'es-lint',
    buildCustomJs: 'build-custom-js',
    buildJsVendors: 'build-js-vendors',
    buildSass: 'build-sass',
    buildStylesVendors: 'build-styles-vendors',
    browserSync: 'browser-sync-server',
    watch: 'watch',
  },
  autoprefixer: {
    versions: 'last 4 versions'
  }
};