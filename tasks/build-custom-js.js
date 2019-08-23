/**
 * Build custom js
 */
'use strict';

const gulp       = require('gulp'),
      browserify = require('browserify'),
      source     = require('vinyl-source-stream');

module.exports = function(options) {

  return function() {
    return browserify({
        entries: `./${options.src}/js/${options.mainJs}`,
        // Remove sourcemap for production
        debug: !options.isProduction
      })
    // If you need to 'babelify' with options:
      // .transform('babelify', {
      //   presets: [
      //     ['@babel/preset-env', {
      //       exclude: [
      //         'transform-template-literals',
      //       ],
      //       debug: true,
      //     }],
      //   ],
      // })
      .transform('babelify', {
        presets: ['@babel/preset-env'],
      })
      .bundle().on('error', function(err) {
        options.showError.apply(this, ['JS error', err])
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };

};