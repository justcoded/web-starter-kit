/**
 * Hint JS
 */
'use strict';

const gulp   = require('gulp'),
      jshint = require('gulp-jshint'),
      notify = require('gulp-notify');

module.exports = function(options) {

  return cb => {
    gulp.src(`./${options.src}/js/**/*.js`)
      .pipe(jshint({
        'esversion': 6
      }))
      .pipe(notify(file => {
        if (file.jshint.success) {
          return false;
        }

        let errors = file.jshint.results.map(data => {
          if (data.error) {
            return ` (${data.error.line}: ${data.error.character}) ${data.error.reason}`;
          }
        }).join("\n");

        let errorWord = file.jshint.results.length == 1 ? 'error' : 'errors';

        return `\u{1b}[31m \n************ JSHint ************\n
 ${file.relative} (${file.jshint.results.length} ${errorWord})\n
${errors}\n
********************************`;
      }));

    cb();
  };

};