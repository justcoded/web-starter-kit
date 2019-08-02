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
    mainScss: 'style.scss',
    mainScssMin: 'styles.css',
    vendorScss: 'vendor.scss',
  },
  fileInclude: {
    templates: 'html/templates',
    dest: './',
  },
  task: {
    htmlHint: 'html-hint',
    esLint: 'es-lint',
    buildCustomJs: 'build-custom-js',
    buildJsVendors: 'build-js-vendors',
    buildSass: 'build-sass',
    buildSassCustom: 'build-sass-custom',
    buildStylesVendors: 'build-styles-vendors',
    cleanBuild: 'clean-build',
    browserSync: 'browser-sync-server',
    watch: 'watch',
    fileInclude: 'file-include',
  },
  autoprefixer: {
    browserslist: [
      '.browserslistrc'
    ]
  },
  getPathesForSassCompiling: function () {
    return {
      files: [],
      isGcmq: false,
    };
  },
};
