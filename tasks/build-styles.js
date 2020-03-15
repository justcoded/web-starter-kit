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

const global = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const production = global.isProduction();
  const mainFileName = production ? global.file.mainStylesMin : global.file.mainStyles;
  const plugins = [
    autoprefixer(),
  ];

  global.error.title = 'Sass compiling error';

  production ? plugins.push(gcmq({ sort: global.buildStyles.sortType, })) : null;
  production ? plugins.push(cssnano()) : null;

  return () => {
    return gulp.src(`./${global.folder.src}/scss/${global.file.mainStylesSrc}`)
      .pipe(rename(mainFileName))
      .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true, })))
      .pipe(sass.sync({ sourceMap: !production, }))
      .on('error', notify.onError(global.error))
      .pipe(postcss(plugins))
      .pipe(gulpif(!production, sourcemaps.write('./')))
      .pipe(gulp.dest(`./${global.folder.build}/css`));
  };
};
