/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const notify = require('gulp-notify');

const { folder, file, error, isProduction, buildHtml } = require('../gulp-config.js');

module.exports = function () {
  const production = isProduction();
  const config = {
    prefix: '@@',
    basepath: `./${buildHtml.templates}`,
    indent: true,
    context: {
      mainJs: production ? file.mainJsMin : file.mainJs,
      vendorJs: production ? file.vendorJsMin : file.vendorJs,
      mainStyles: production ? file.mainStylesMin : file.mainStyles,
      vendorStyles: production ? file.vendorStylesMin : file.vendorStyles,
    },
  };

  error.title = 'HTML compiling error';

  return () => {
    return gulp.src(`./${buildHtml.templates}/**/*.html`)
      .pipe(fileInclude(config))
      .on('error', notify.onError(error))
      .pipe(gulp.dest(`./${folder.build}`));
  };
};
