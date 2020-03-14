module.exports = {
  task: {
    lintHtml: 'lint-html',
    lintJs: 'lint-js',
    fixJs: 'fix-js',
    buildHtml: 'build-html',
    buildJs: 'build-js',
    buildJsVendors: 'build-js-vendors',
    buildStyles: 'build-styles',
    buildStylesCustom: 'build-styles-custom',
    buildStylesVendors: 'build-styles-vendors',
    buildImages: 'build-images',
    cleanBuild: 'clean-build',
    copyFiles: 'copy-files',
    copyFilesProd: 'copy-files-production',
    browserSync: 'browser-sync',
    watch: 'watch',
  },
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
  buildImages: {
    imageExtensions: 'jpg,jpeg,png,svg,gif,ico',
    isImageMin: false,
  },
  error: {
    icon: './sys_icon/error_icon.png',
    wait: true,
  },
  getFilesForStylesCustom() {
    return {
      files: [],
      isGcmq: false,
    };
  },
  getFilesToCopyProd(folder) {
    return [
      `./${folder}/**`,
      '.htaccess',
    ];
  },
  getFilesToCopy(folder) {
    return [
      `./${folder}/**`,
      `!{${folder}/images,${folder}/images/**}`,
      `!{${folder}/js,${folder}/js/**}`,
      `!{${folder}/html,${folder}/html/**}`,
      `!{${folder}/scss,${folder}/scss/**}`,
      `!{${folder}/vendor_entries,${folder}/vendor_entries/**}`,
    ];
  },
  isProduction() {
    return process.argv[process.argv.length - 1] === 'build';
  },
  isFixJs() {
    return process.argv[process.argv.length - 1] === 'fix-js';
  }
};
