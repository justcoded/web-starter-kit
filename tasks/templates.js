const gulp = require('gulp'),
  gulpif = require('gulp-if'),
  pug = require('gulp-pug');

module.exports = function (options) {

  return function () {
    return new Promise((resolve, reject) => {
      const emitty = require('emitty').setup(options.pug, 'pug');
      emitty.scan(global.emittyChangedFile)
        .then(() => {
          gulp.src(`${options.pug}/views/*.pug`)
            .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
            .pipe(pug({
              pretty: true
            }).on('error', function (err) {
              options.showError.apply(this, ['Pug compile error', err]);
            }))
            .pipe(gulp.dest(options.dest))
            .on('end', resolve)
            .on('error', reject);
        })
        .catch(e => {
          console.log(e)
        });
    })
  };

};