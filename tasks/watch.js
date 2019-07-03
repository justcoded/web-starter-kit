/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function (options) {

  return () => {
    gulp.watch(`js/**/*`, gulp.series(options.tasks.buildCustomJs, options.tasks.esLint));

    gulp.watch(`scss/**/*`, gulp.series(options.tasks.buildSass));

    gulp.watch(`./html/**/*`, gulp.series(options.tasks.fileInclude));

    gulp.watch('*.html', gulp.series(options.tasks.htmlHint));

    gulp.watch([`*.html`, `js/**/*`, `../../**/*.css`, `!scss/**/*.scss`, `!./${options.dest}/**/*.map`])
      .on('change', options.browserSync.reload);

  };

};