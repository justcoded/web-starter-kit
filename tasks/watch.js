/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function (options) {

  return () => {
    gulp.watch(`./${options.src}/js/**/*`, gulp.series(options.tasks.lintJs, options.tasks.buildJs));

    gulp.watch(`./${options.src}/scss/**/*`, gulp.series(options.tasks.buildStyles, options.tasks.buildStylesCustom));

    gulp.watch(`./${options.src}/html/**/*`, gulp.series(options.tasks.buildHtml, options.tasks.lintHtml));

    gulp.watch(`./${options.src}/vendor_entries/vendor.js`, gulp.series(options.tasks.buildJsVendors));

    gulp.watch(`./${options.src}/vendor_entries/vendor.scss`, gulp.series(options.tasks.buildStylesVendors));

    gulp.watch(options.filesToCopy)
      .on('unlink', (path) => {
        options.deleteFile({
          path,
          event: 'unlink'
        }, options.src, options.dest);
      })
      .on('add', gulp.series(options.tasks.copyFiles));

    gulp.watch(`${options.src}/images/**/*`)
      .on('unlink', (path) => {
        options.deleteFile({
          path,
          event: 'unlink'
        }, options.src, options.dest);
      })
      .on('add', gulp.series(options.tasks.buildImages));

    gulp.watch([`./${options.dest}/**/*`, `!./${options.dest}/**/*.map`])
      .on('change', options.browserSync.reload)
      .on('unlink', options.browserSync.reload)
      .on('add', options.browserSync.reload);
  };
};
