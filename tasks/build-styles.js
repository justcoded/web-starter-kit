/**
 * Build styles for application
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gcmq = require('postcss-sort-media-queries');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const production = global.isProduction();
  const mainFileName = production ? global.file.mainStylesMin : global.file.mainStyles;
  const plugins = [
    autoprefixer(),
  ];

  if (production) {
    plugins.push(gcmq({ sort: global.buildStyles.sortType, }));
    plugins.push(cssnano());
  }

  return (done) => {
    return gulp.src(`./${global.folder.src}/scss/${global.file.mainStylesSrc}`, { sourcemaps: !production })
      .pipe(rename(mainFileName))
      .pipe(sass.sync({ sourceMap: !production, }))
      .on('error', (error) => notifier.error(error.message, 'Main Sass compiling error', done))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`./${global.folder.dev}/css`, { sourcemaps: './' }));
  };
};
