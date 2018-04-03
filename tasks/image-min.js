/**
 * Minify images
 */
'use strict';

const gulp     = require('gulp'),
      newer    = require('gulp-newer'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant');

module.exports = function(options) {

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