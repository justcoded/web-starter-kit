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

const { folder, error, isProduction, buildStyles, getFilesForStylesCustom } = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const production = isProduction();
  const { files, isGcmq } = getFilesForStylesCustom();
  const plugins = [
    autoprefixer(),
  ];

  error.title = 'Sass compiling error';

  isGcmq ? plugins.push(gcmq({ sort: buildStyles.sortType, })) : null;
  production ? plugins.push(cssnano()) : null;

  return (done) => {
    if (files.length > 0) {
      return gulp.src(files)
        .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true, })))
        .pipe(sass.sync({ sourceMap: !production, }))
        .on('error', notify.onError(error))
        .pipe(postcss(plugins))
        .pipe(gulpif(!production, sourcemaps.write('./')))
        .pipe(gulp.dest(`./${folder.build}/css`));
    }

    return done();
  };
};
