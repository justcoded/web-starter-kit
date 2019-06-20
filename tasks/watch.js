/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function (options) {

  return () => {
    gulp.watch(`js/**/*`, gulp.series(options.tasks.buildCustomJs, options.tasks.esLint));

    gulp.watch(`scss/**/*`, gulp.series(options.tasks.buildSass));

    gulp.watch('html/*.html', gulp.series(options.tasks.htmlHint));

    gulp.watch([`**/*`, `!scss/**/*.scss`, `!./${options.dest}/**/*.map`, 'html/*.html'])
      .on('change', options.browserSync.reload);

    gulp.watch(`../../**/*.css`)
      .on('change', options.browserSync.reload);
  };

};