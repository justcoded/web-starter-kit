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
    let jsVendors = require('../src/vendor_entries/vendor.js');

    return gulp.src(filesExist(jsVendors))
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./assets/js'));
  };

};