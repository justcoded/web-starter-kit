/**
 * Minify images
 */
'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

module.exports = function (options) {

  return () => {
    return gulp.src(`./${options.src}/images/**/*`)
      .pipe(newer(`./${options.dest}/images/`))
      .pipe(imagemin([
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: false
          }]
        })
      ]))
      .pipe(gulp.dest(`./${options.dest}/images/`));
  };
};
