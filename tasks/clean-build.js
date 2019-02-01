/**
 * Clean build folder
 */
'use strict';

const gulp = require('gulp'),
      del  = require('del');

module.exports = function(options) {

  return () => {
    return del([
      `${options.src}/js/`,
      `${options.src}/js/*`,
      `${options.src}/css/`,
      `${options.src}/css/*`
    ], { dot: true });
  };
};