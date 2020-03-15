/**
 * Copy & minify images
 */
'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

const global = require('../gulp-config.js');

module.exports = function () {
  const runMinify = global.isProduction() && global.buildImages.isImageMin;
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
    return gulp.src(`./${global.folder.src}/images/**/*`)
      .pipe(newer(`./${global.folder.build}/images`))
      .pipe(gulpif(runMinify, imagemin(plugins)))
      .pipe(gulp.dest(`./${global.folder.build}/images`));
  };
};
