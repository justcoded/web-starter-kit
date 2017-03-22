/**
 * Minify images
 */
'use strict';

const gulp = require('gulp'),
      newer = require('gulp-newer'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant');

module.exports = function(options) {

  return () => {
    return gulp.src(`./src/images/**/*`)
      .pipe(newer(`assets/images/`))
      .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        svgoPlugins: [
          {
            removeViewBox: false
          }
        ],
        use: [
          pngquant()
        ]
      }))
      .pipe(gulp.dest(`assets/images/`));
  };

};