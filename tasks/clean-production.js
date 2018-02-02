/**
 * Clean production folder
 */
'use strict';

const gulp = require('gulp'),
      del  = require('del');

module.exports = function(options) {

  return () => {
    return del([`./${options.src}/`], { dot: true });
  };

};