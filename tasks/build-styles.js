/**
 * Build styles for application
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
const rename = require('gulp-rename');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const plugins = [
    autoprefixer(),
  ];
  const errorConfig = {
    title: 'Sass compiling error',
    icon: './sys_icon/error_icon.png',
    wait: true,
  };

  // Optional - sorting variant css media queries: 'desktop-first' || 'mobile-first'
  options.isProduction ? plugins.push(gcmq({ sort: 'desktop-first', })) : false;
  options.isProduction ? plugins.push(cssnano()) : false;

  return () => {
    return gulp.src(`./${options.src}/scss/${options.mainScss}`)
      .pipe(rename(options.mainScssMin))
      .pipe(gulpif(!options.isProduction, sourcemaps.init({ loadMaps: true, })))
      .pipe(sass.sync({ sourceMap: !options.isProduction, }))
      .on('error', notify.onError(errorConfig))
      .pipe(postcss(plugins))
      .pipe(gulpif(!options.isProduction, sourcemaps.write('./')))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };
};
