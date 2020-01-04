/**
 * Build custom styles files listed in the config
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const errorConfig = {
    title: 'Sass compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true
  };

  return (done) => {
    const { files, isGcmq } = options.sassFilesInfo;

    if (files.length > 0) {
      return gulp.src(files)
        .pipe(gulpif(!options.isProduction, sourcemaps.init({ loadMaps: true })))
        .pipe(sass.sync({
          sourceMap: !options.isProduction,
        }))
        .on('error', notify.onError(errorConfig))
        .pipe(autoprefixer())
        .pipe(gulpif(isGcmq, gcmq()))
        .pipe(gulpif(options.isProduction, cssnano({ safe: true })))
        .pipe(gulpif(!options.isProduction, sourcemaps.write('./')))
        .pipe(gulp.dest(`./${options.dest}/css`));
    }

    return done();
  };
};
