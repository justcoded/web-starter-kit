module.exports = {
  task: {
    lintHtml: 'lint-html',
    lintJs: 'lint-js',
    fixJs: 'fix-js',
    buildHtml: 'build-html',
    buildJs: 'build-js',
    buildStyles: 'build-styles',
    buildStylesCustom: 'build-styles-custom',
    buildStylesVendors: 'build-styles-vendors',
    buildImages: 'build-images',
    cleanBuild: 'clean-build',
    copyFiles: 'copy-files',
    copyFilesProd: 'copy-files-production',
    browserSync: 'browser-sync',
    watch: 'watch',
    build: 'build',
  },
  folder: {
    tasks: 'tasks',
    src: 'src',
    dev: 'assets',
    build: 'production',
  },
  file: {
    mainHtml: 'index.html',
    mainJs: 'app.js',
    mainJsMin: 'app.min.js',
    vendorJs: 'vendor.js',
    vendorJsMin: 'vendor.min.js',
    mainStylesSrc: 'styles.scss',
    mainStyles: 'styles.css',
    mainStylesMin: 'styles.min.css',
    vendorStylesSrc: 'vendor.scss',
    vendorStyles: 'vendor.css',
    vendorStylesMin: 'vendor.min.css',
  },
  buildHtml: {
    templates: 'src/html/templates',
  },
  buildStyles: {
    // Sorting type css media queries: 'desktop-first' || 'mobile-first'
    sortType: 'desktop-first',
  },
  buildJs: {
    externalLibs: {},
  },
  buildImages: {
    imageExtensions: 'jpg,jpeg,png,svg,gif,ico',
    isImageMin: false,
  },
  error: {
    sound: true,
    title: '< SYSTEM ERROR >',
    icon: './system_files/icons/error_icon.png',
    wait: true,
  },
  getFilesForStylesCustom() {
    return {
      files: [],
      // gcmq - group css media queries
      isGcmq: false,
    };
  },
  getFilesToCopy() {
    return [
      `./${this.folder.src}/**`,
      `!{${this.folder.src}/images,${this.folder.src}/images/**}`,
      `!{${this.folder.src}/js,${this.folder.src}/js/**}`,
      `!{${this.folder.src}/html,${this.folder.src}/html/**}`,
      `!{${this.folder.src}/scss,${this.folder.src}/scss/**}`,
      `!{${this.folder.src}/vendor_entries,${this.folder.src}/vendor_entries/**}`,
    ];
  },
  getFilesToCopyProd() {
    return [
      `./${this.folder.dev}/**`,
      '.htaccess',
    ];
  },
  isProduction() {
    return process.argv[process.argv.length - 1] === this.task.build;
  },
  isFixJs() {
    return process.argv[process.argv.length - 1] === this.task.fixJs;
  }
};
