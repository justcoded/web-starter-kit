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

const { file, folder, error, isProduction, buildStyles } = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const production = isProduction();
  const plugins = [
    autoprefixer(),
  ];

  error.title = 'Sass compiling error';

  production ? plugins.push(gcmq({ sort: buildStyles.sortType, })) : null;
  production ? plugins.push(cssnano()) : null;

  return () => {
    return gulp.src(`./${folder.src}/scss/styles.scss`)
      .pipe(rename(production ? file.mainStylesMin : file.mainStyles))
      .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true, })))
      .pipe(sass.sync({ sourceMap: !production, }))
      .on('error', notify.onError(error))
      .pipe(postcss(plugins))
      .pipe(gulpif(!production, sourcemaps.write('./')))
      .pipe(gulp.dest(`./${folder.build}/css`));
  };
};
