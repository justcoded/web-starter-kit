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
  buildStyles: {
    // Sorting type css media queries: 'desktop-first' || 'mobile-first'
    sortType: 'desktop-first',
  },
  buildImages: {
    imageExtensions: 'jpg,jpeg,png,svg,gif,ico',
    isImageMin: false,
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
    buildImages: 'build-images',
    cleanProd: 'clean-production',
    cleanBuild: 'clean-build',
    copyFiles: 'copy-folders',
    copyFilesProd: 'copy-folders-production',
    browserSync: 'browser-sync-server',
    watch: 'watch',
  },
  error: {
    icon: './sys_icon/error_icon.png',
    wait: true,
  },
  getFilesForStylesCustom: function() {
    return {
      files: [],
      isGcmq: false,
    };
  },
  getFilesToCopyProd: function() {
    return [
      `./${this.folder.build}/**`,
      '.htaccess',
    ];
  },
  getFilesToCopy: function() {
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
