/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp       = require('gulp'),
      filesExist = require('files-exist'),
      uglify     = require('gulp-uglify'),
      concat     = require('gulp-concat');

module.exports = function(options) {

  return () => {
    let jsVendors = require(`../${options.src}/vendor_entries/${options.vendorJs}`);

    return gulp.src(filesExist(jsVendors))
      .pipe(concat(options.vendorJsMin))
      .pipe(uglify())
      .pipe(gulp.dest(`./${options.dest}/js`));
  };

};