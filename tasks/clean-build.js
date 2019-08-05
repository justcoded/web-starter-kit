/**
 * Clean build folder
 */
'use strict';

const del  = require('del');

module.exports = function(options) {

  return () => {
    return del([
      `../${options.src}/css`,
      `../${options.src}/js`,
    ], { force: true });
  };
};
