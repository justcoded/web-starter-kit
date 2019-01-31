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
    buildSassFiles: 'compile-sass-files',
    buildStylesVendors: 'build-styles-vendors',
    cleanBuild: 'clean-build',
    copyFolders: 'copy-folders',
    copyFoldersProduction: 'copy-folders-production',
    browserSync: 'browser-sync-server',
    watch: 'watch',
  },
  autoprefixer: {
    versions: 'last 4 versions'
  },
  getPathesForSassCompiling: function () {
    return {
      files: [],
      isGcmq: false
     };
  },
  getPathesToCopy: function() {
    return [
      `./${this.folder.src}/**`,
      `!{${this.folder.src}/images,${this.folder.src}/images/**}`,
      `!{${this.folder.src}/js,${this.folder.src}/js/**}`,
      `!{${this.folder.src}/scss,${this.folder.src}/scss/**}`,
      `!{${this.folder.src}/vendor_entries,${this.folder.src}/vendor_entries/**}`
    ];
  }
};