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
    buildCustomJs: 'build-custom-js',
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
  },
  autoprefixer: {
    versions: 'last 4 versions'
  },
  ignore: function() {
    return [
      `!${this.folder.src}/`,
      `!${this.folder.src}/**/*`,
      '!bower/',
      '!bower/**/*',
      '!node_modules/**/*',
      '!node_modules/',
      `!${this.folder.build}/css/**.map`,
      `!${this.folder.build}/images/info.txt`,
      '!.bowerrc',
      '!bower.json',
      '!.gitignore',
      '!gulpfile.js',
      '!LICENSE',
      '!package.json',
      `!${this.folder.prod}`,
      '!README.md',
      '!CONTRIBUTING.md',
      '!gulp-config.js',
      '!docs/',
      '!docs/**/*',
      '!tasks/',
      '!tasks/**/*'
    ];
  }
};