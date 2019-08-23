/**
 * Build custom js
 */
'use strict';

const gulp       = require('gulp'),
      browserify = require('browserify'),
      source     = require('vinyl-source-stream');

module.exports = function(options) {

  return function() {
    return browserify({ entries: `./js/${options.mainJs}` })
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
        presets: ['@babel/preset-env']
      })
      .bundle().on('error', function(err) {
        options.showError.apply(this, ['JS error', err])
      })
      .pipe(source('jquery.main.js'))
      .pipe(gulp.dest(`../${options.dest}/js`));
  };

};
