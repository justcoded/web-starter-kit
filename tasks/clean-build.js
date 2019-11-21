/**
 * Clean build folder
 */
'use strict';

const del = require('del');

module.exports = function (options) {

  return async () => {
    const deletedPaths = await del([
      `*.html`,
      `${options.src}/**/*`,
      `!${options.src}/images/`,
      `!${options.src}/images/**`
    ], { force: true });

    // log paths for deleted files & directories
    // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  };
};
