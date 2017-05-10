/**
 * Watch for file changes
 */
'use strict';

const gulp  = require('gulp'),
      watch = require('gulp-watch');

module.exports = function(options) {
  return () => {
    watch(`./${options.src}/js/**/*`, () => {
      gulp.start([
        options.tasks.buildCustomJs,
        options.tasks.jsHint
      ]);
    });

    watch(`./${options.src}/scss/**/*`, () => {
      gulp.start(options.tasks.buildSass);
    });

    watch(`./${options.src}/images/**/*.+(${options.imageExtensions})`, file => {
      if(file.event === 'unlink') {
        options.deleteFile(file, options.src, options.dest);
      } else {
        gulp.start(options.tasks.imageMin);
      }
    });

    watch('./*.html', () => {
      gulp.start(options.tasks.htmlHint);
    });

    gulp.watch([`./${options.dest}/**/*`, './*.html'])
      .on('change', options.browserSync.reload);
  };

};