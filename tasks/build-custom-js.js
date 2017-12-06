/**
 * Build custom js
 */
'use strict';

const gulp       = require('gulp'),
      browserify = require('browserify'),
      babelify   = require('babelify'),
      source     = require('vinyl-source-stream'),
      fs         = require('fs'),
      header     = require('gulp-header');

module.exports = function(options) {

  return function() {
    return browserify({
        entries: `./${options.src}/js/${options.mainJs}`,
        // Remove sourcemap for production
        debug: options.isProduction
      })
      .transform('babelify', {
        presets: ['es2015']
      })
      .bundle().on('error', function(err) {
        options.showError.apply(this, ['JS error', err])
      })
      .pipe(source('app.js'))
      .pipe(header(fs.readFileSync(options.requireJs)))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };

};