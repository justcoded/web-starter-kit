/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp'),
      watch = require('gulp-watch');

module.exports = function(options) {
  return () => {
    gulp.watch('./src/js/**/*', [
      options.tasks.buildCustomJs, options.tasks.jsHint
    ]);

    gulp.watch('src/scss/**/*', [options.tasks.buildSass]);

    watch('src/images/**/*', (file) => {
      if(file.event === 'unlink') {
        options.deleteFile(file, 'src', 'assets');
      } else {
        gulp.start(options.tasks.imageMin);
      }
    });

    gulp.watch('./*.html', [options.tasks.htmlHint]);

    gulp.watch(['./assets/**/*', './*.html'])
      .on('change', options.browserSync.reload);
  };

};