/**
 * Copy & minify images
 */
'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

module.exports = function (options) {
  const runMinify = options.isProduction && options.isImageMin;
  const plugins = [
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 90, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: false, },
      ]
    })
  ];
  const config = {
    silent: !runMinify,
  };
  
  return () => {
    return gulp.src(`./${options.src}/images/**/*`)
      .pipe(newer(`./${options.dest}/images/**/*`))
      .pipe(gulpif(runMinify, imagemin(plugins, config)))
      .pipe(gulp.dest(`./${options.dest}/images`));
  };
};
