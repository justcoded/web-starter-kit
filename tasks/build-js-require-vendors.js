/**
 * Build js require vendors
 */
'use strict';

const gulp       = require('gulp'),
      filesExist = require('files-exist'),
      rename     = require('gulp-rename'),
      uglify     = require('gulp-uglify'),
      stream      = require('merge-stream')();

module.exports = function(options) {

  return () => {
    const jsVendors = require(`../${options.src}/vendor_entries/${options.requireVendorsJs}`);

    for (let name in jsVendors) {
      const path = jsVendors[name];

      stream.add(gulp.src(filesExist(path))
        .pipe(uglify())
        .pipe(rename({
          basename: name
        }))
        .pipe(gulp.dest(`./${options.dest}/js/vendor`)));
    }

    return stream;
  };

};