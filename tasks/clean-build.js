/**
 * Clean build folder
 */
'use strict';

const del  = require('del');

module.exports = function(options) {

  return () => {
    return del([
      `${options.src}/**/*`,
      `!${options.src}/images/`,
      `!${options.src}/images/**`
    ], { dot: true });
  };
};
