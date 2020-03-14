/**
 * Copy & minify images
 */
'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

const { folder, isProduction, buildImages } = require('../gulp-config.js');

module.exports = function () {
  const runMinify = isProduction() && buildImages.isImageMin;
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

  return () => {
    return gulp.src(`./${folder.src}/images/**/*`)
      .pipe(newer(`./${folder.build}/images`))
      .pipe(gulpif(runMinify, imagemin(plugins)))
      .pipe(gulp.dest(`./${folder.build}/images`));
  };
};
