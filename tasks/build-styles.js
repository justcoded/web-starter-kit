/**
 * Build styles for application from SASS
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const gcmq = require('postcss-sort-media-queries');
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

  options.isProduction ? plugins.push(gcmq({ sort: options.sortType, })) : false;

  return () => {
    return gulp.src(`./scss/${options.mainScss}`)
      .pipe(gulpif(!options.isProduction, sourcemaps.init({ loadMaps: true, })))
      .pipe(sass.sync({ sourceMap: !options.isProduction, }))
      .on('error', notify.onError(errorConfig))
      .pipe(postcss(plugins))
      .pipe(gulpif(!options.isProduction, sourcemaps.write('./')))
      .pipe(gulp.dest(`../${options.dest}/css`));
  };
};
