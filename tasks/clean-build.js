/**
 * Clean build folder
 */
'use strict';

const del = require('del');

module.exports = function (options) {

  return async () => {
    await del([
      `../${options.dest}/css`,
      `../${options.dest}/js`,
    ], { force: true });
  };
};
