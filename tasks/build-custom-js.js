/**
 * Build custom js
 */
'use strict';

const gulp       = require('gulp'),
      browserify = require('browserify'),
      babelify   = require('babelify'),
      source     = require('vinyl-source-stream');

module.exports = function(options) {

  return function() {
    return browserify({ entries: `./js/${options.mainJs}` })
      .transform('babelify', {
        presets: ['es2015']
      })
      .bundle().on('error', function(err) {
        options.showError.apply(this, ['JS error', err])
      })
      .pipe(source('jquery.main.js'))
      .pipe(gulp.dest(`../${options.dest}/js`));
  };

};
