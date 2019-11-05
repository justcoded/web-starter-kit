/**
 * Clean build folder
 */
'use strict';

const del = require('del');

module.exports = function (options) {

  return async () => {
    await del([
      `../${options.dir}/css`,
      `../${options.dir}/js`,
    ], { force: true });
  };
};
