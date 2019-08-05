module.exports = {
  folder: {
    tasks: 'tasks',
    src: 'src',
    build: 'assets',
    prod: 'production'
  },
  file: {
    mainHtml: 'index.html',
    mainJs: 'app.js',
    vendorJs: 'vendor.js',
    vendorJsMin: 'vendor.min.js',
    mainScss: 'styles.scss',
    mainScssMin: 'styles.min.css',
    vendorScss: 'vendor.scss',
    vendorScssMin: 'vendor.min.css',
  },
  fileInclude: {
    templates: 'src/html/templates',
    dest: './',
  },
  task: {
    htmlHint: 'html-hint',
    esLint: 'es-lint',
    buildCustomJs: 'build-custom-js',
    buildJsVendors: 'build-js-vendors',
    buildSass: 'build-sass',
    buildSassFiles: 'compile-sass-files',
    buildStylesVendors: 'build-styles-vendors',
    imageMin: 'image-min',
    cleanProd: 'clean-production',
    cleanBuild: 'clean-build',
    copyFolders: 'copy-folders',
    copyFoldersProduction: 'copy-folders-production',
    fileInclude: 'file-include',
    browserSync: 'browser-sync-server',
    watch: 'watch',
  },
  autoprefixer: {
    browserslist: [
      '.browserslistrc'
    ]
  },
  imageExtensions: 'jpg|jpeg|png|svg|gif|ico|tiff',
  getPathesForSassCompiling: function () {
    return {
      files: [],
      isGcmq: false
     };
  },
  getPathesToCopyForProduction: function() {
    return [
      './**/*',
      '!.*',
      '!.*/**',
      '.htaccess',
      `!${this.folder.prod}`,
      `!${this.folder.build}/images/info.txt`,
      `!{${this.folder.src},${this.folder.src}/**}`,
      '!{tasks,tasks/**}',
      '!{node_modules,node_modules/**}',
      '!CONTRIBUTING.md',
      '!gulpfile.js',
      '!gulp-config.js',
      '!LICENSE',
      '!package.json',
      '!package-lock.json',
      '!README.md',
      '!readme.txt'
    ];
  },
  getPathesToCopy: function() {
    return [
      `./${this.folder.src}/**`,
      `!{${this.folder.src}/images,${this.folder.src}/images/**}`,
      `!{${this.folder.src}/js,${this.folder.src}/js/**}`,
      `!{${this.folder.src}/html,${this.folder.src}/html/**}`,
      `!{${this.folder.src}/scss,${this.folder.src}/scss/**}`,
      `!{${this.folder.src}/vendor_entries,${this.folder.src}/vendor_entries/**}`
    ];
  }
};
