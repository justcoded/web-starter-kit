/**
 * Clean build folder
 */
'use strict';

const del = require('del');

module.exports = function (options) {
  const dir = [
    `${options.src}/**/*`,
    `!${options.src}/images/`,
    `!${options.src}/images/**`,
  ];
  const config = {
    force: true,
  };

  return async () => {
    const deletedPaths = await del(dir, config);

    // log paths for deleted files & directories
    // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  };
};
