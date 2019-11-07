/**
 * Clean production folder
 */
'use strict';

const del = require('del');

module.exports = function (options) {

  return async () => {
    const deletedPaths = await del([`./${options.src}/`], { force: true });

    // log paths for deleted files & directories
    // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  };
};
