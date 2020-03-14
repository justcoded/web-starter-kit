/**
 * Start browserSync server
 */
'use strict';

const fs = require('fs');

const { folder, file } = require('../gulp-config.js');

module.exports = function (options) {
  // If index.html exist - open it, else show folder
  const listDirectory = !fs.existsSync(`./${folder.build}/${file.mainHtml}`);

  return () => {
    options.browserSyncInstance.init({
      notify: false,
      injectChanges: true,
      minify: false,
      server: {
        baseDir: folder.build,
        directory: listDirectory,
      },
      snippetOptions: {
        // Provide a custom Regex for inserting the snippet
        rule: {
          match: /$/i,
          fn: (snippet, match) => snippet + match,
        }
      },
      port: 8080,
    });
  };
};
