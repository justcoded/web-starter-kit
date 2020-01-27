/**
 * Build custom styles files listed in the config
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const gcmq = require('postcss-sort-media-queries');
const cssnano = require('cssnano');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const { files, isGcmq } = options.stylesCustomInfo;
  const plugins = [
    autoprefixer(),
  ];
  
  options.error.title = 'Sass compiling error';

  isGcmq ? plugins.push(gcmq({ sort: options.sortType, })) : false;
  options.isProduction ? plugins.push(cssnano()) : false;

  return (done) => {
    if (files.length > 0) {
      return gulp.src(files)
        .pipe(gulpif(!options.isProduction, sourcemaps.init({ loadMaps: true, })))
        .pipe(sass.sync({ sourceMap: !options.isProduction, }))
        .on('error', notify.onError(options.error))
        .pipe(postcss(plugins))
        .pipe(gulpif(!options.isProduction, sourcemaps.write('./')))
        .pipe(gulp.dest(`./${options.dest}/css`));
    }

    return done();
  };
};
