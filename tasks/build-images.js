/**
 * Copy & minify images
 */
'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

const notifier = require('../helpers/notifier');
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

  return (done) => {
    return gulp.src(`./${global.folder.src}/images/**/*`)
      .pipe(newer(`./${global.folder.dev}/images`))
      .pipe(gulpif(runMinify, imagemin(plugins)))
      .on('error', (error) => notifier.error(error.message, 'Image Min error', done))
      .pipe(gulp.dest(`./${global.folder.dev}/images`));
  };
};
