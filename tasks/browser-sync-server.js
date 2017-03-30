/**
 * Start browserSync server
 */
'use strict';

const gulp  = require('gulp'),
      fs    = require('fs'),
      watch = require('gulp-watch');

module.exports = function(options) {

  return () => {
    // If index.html exist - open it, else show folder
    let listDirectory = fs.existsSync('index.html') ? false : true;

    options.browserSync.init({
      server: {
        baseDir: "./",
        directory: listDirectory
      },
      snippetOptions: {
        // Provide a custom Regex for inserting the snippet
        rule: {
          match: /$/i,
          fn: (snippet, match) => snippet + match
        }
      },
      port: 8080
    });

    watch(`./${options.src}/js/**/*`, () => {
      gulp.start([
        options.tasks.buildCustomJs,
        options.tasks.jsHint
      ]);
    });

    watch(`./${options.src}/scss/**/*`, () => {
      gulp.start(options.tasks.buildSass);
    });

    watch(`./${options.src}/images/**/*`, (file) => {
      if(file.event === 'unlink') {
        options.deleteFile(file, options.src, options.dest);
      } else {
        gulp.start(options.tasks.imageMin);
      }
    });

    watch('./*.html', () => {
      gulp.start(options.tasks.htmlHint);
    });

    gulp.watch([`./${options.dest}/**/*`, './*.html'])
      .on('change', options.browserSync.reload);
  };

};