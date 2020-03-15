/**
 * Start browserSync server
 */
'use strict';

const fs = require('fs');

const global = require('../gulp-config.js');

module.exports = function (options) {
  // If index.html exist - open it, else show folder
  const listDirectory = !fs.existsSync(`./${global.folder.build}/${global.file.mainHtml}`);

  return () => {
    options.browserSyncInstance.init({
      notify: false,
      injectChanges: true,
      minify: false,
      server: {
        baseDir: global.folder.build,
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
