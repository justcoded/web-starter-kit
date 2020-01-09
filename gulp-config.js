module.exports = {
  folder: {
    tasks: 'tasks',
    src: 'src',
    build: 'assets',
    prod: 'production',
    temp: '.temp',
  },
  file: {
    mainHtml: 'index.html',
    mainJs: 'app.js',
    mainJsMin: 'app.min.js',
    vendorJs: 'vendor.js',
    vendorJsMin: 'vendor.min.js',
    vendorJsTemp: 'vendor.temp.js',
    mainScss: 'styles.scss',
    mainScssMin: 'styles.min.css',
    vendorScss: 'vendor.scss',
    vendorScssMin: 'vendor.min.css',
  },
  buildHtml: {
    templates: 'src/html/templates',
    dest: './assets',
  },
  task: {
    lintHtml: 'lint-html',
    lintJs: 'lint-js',
    buildHtml: 'build-html',
    buildJs: 'build-js',
    buildJsVendors: 'build-js-vendors',
    buildStyles: 'build-styles',
    buildStylesCustom: 'build-styles-custom',
    buildStylesVendors: 'build-styles-vendors',
    imageMin: 'image-min',
    cleanProd: 'clean-production',
    cleanBuild: 'clean-build',
    copyFolders: 'copy-folders',
    copyFoldersProd: 'copy-folders-production',
    browserSync: 'browser-sync-server',
    watch: 'watch',
  },
  imageExtensions: 'jpg|jpeg|png|svg|gif|ico|tiff',
  getPathesForSassCompiling: function () {
    return {
      files: [],
      isGcmq: false,
    };
  },
  getPathesToCopyForProduction: function () {
    return [
      `./${this.folder.build}/**`,
      '.htaccess',
    ];
  },
  getPathesToCopy: function () {
    return [
      `./${this.folder.src}/**`,
      `!{${this.folder.src}/images,${this.folder.src}/images/**}`,
      `!{${this.folder.src}/js,${this.folder.src}/js/**}`,
      `!{${this.folder.src}/html,${this.folder.src}/html/**}`,
      `!{${this.folder.src}/scss,${this.folder.src}/scss/**}`,
      `!{${this.folder.src}/vendor_entries,${this.folder.src}/vendor_entries/**}`,
    ];
  }
};
