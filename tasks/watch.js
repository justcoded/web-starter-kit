/**
 * Watch for file changes
 */
'use strict';

const gulp  = require('gulp'),
      watch = require('gulp-watch');

module.exports = function(options) {
  return () => {
    global.watch = true;

    watch(`./${options.src}/js/**/*`, () => {
      gulp.start([
        options.tasks.buildCustomJs,
        options.tasks.jsHint
      ]);
    });

    watch(`${options.pug}/**/*.pug`, () => {
      gulp.start('templates');
    })
    .on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});

    watch(`./${options.src}/scss/**/*`, () => {
      gulp.start(options.tasks.buildSass);
    });

    watch(`./${options.src}/images/**/*.+(${options.imageExtensions})`, file => {
      if(file.event === 'unlink') {
        options.deleteFile(file, options.src, options.dest);
      } else {
        gulp.start(options.tasks.imageMin);
      }
    });

    watch([`./${options.dest}/**/*`, './*.html'], options.browserSync.reload)
  };

};