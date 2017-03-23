/**
 * Watch for file changes
 */
'use strict';

const gulp  = require('gulp'),
      watch = require('gulp-watch');

module.exports = function(options) {
  return () => {
    gulp.watch(`./${options.src}/js/**/*`, [
      options.tasks.buildCustomJs, options.tasks.jsHint
    ]);

    gulp.watch(`./${options.src}/scss/**/*`, [options.tasks.buildSass]);

    watch(`./${options.src}/images/**/*`, (file) => {
      if(file.event === 'unlink') {
        options.deleteFile(file, options.src, options.dest);
      } else {
        gulp.start(options.tasks.imageMin);
      }
    });

    gulp.watch('./*.html', [options.tasks.htmlHint]);

    gulp.watch([`./${options.dest}/**/*`, './*.html'])
      .on('change', options.browserSync.reload);
  };

};