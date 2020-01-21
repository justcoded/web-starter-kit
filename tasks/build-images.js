/**
 * Minify images
 */
'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

module.exports = function (options) {

  return () => {
    return gulp.src(`./${options.src}/images/**/*`)
      .pipe(newer(`./${options.dest}/images/**/*`))
      .pipe(gulpif(options.isProduction && options.isImageMin, imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 90, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false, },
          ]
        })
      ])))
      .pipe(gulp.dest(`./${options.dest}/images`));
  };
};
