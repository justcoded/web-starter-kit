/**
 * Start browserSync server
 */
'use strict';

const fs = require('fs');

const global = require('../gulp-config.js');

module.exports = function (options) {

  return () => {
    options.browserSyncInstance.init({
      notify: false,
      injectChanges: false,
      minify: false,
      server: {
        baseDir: global.folder.dev,
        // If index.html exist - open it, else show folder
        directory: !fs.existsSync(`./${global.folder.dev}/${global.file.mainHtml}`),
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
