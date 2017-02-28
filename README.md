# Project Skeleton

### Install build

* `npm install` installs all modules listed as dependencies in `package.json` and automatically run `bower install` install packages as dependencies in `bower.json`.

### Gulp complex commands:
* `gulp` create build **with** localhost server and browsersync;
* `gulp dev` create build **without** localhost server and browsersync.

### SCSS
* All custom **scss** files locate in `src/scss/` folder;
* Entry point for all scss is `src/scss/style.scss` you can **import** all your *.scss* files from here;
* You **don't need** to write **prefixes** for different browsers like `-webkit` it will be done by the gulp.

### JS
* All custom **javascript** files locate in `js/` folder;
* Entry point for javascript is `src/js/app.js` you can **import** all you *.js* files from here using [ES6 import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) feature;
* All javascript is **babelified** so yes! You can use all kind of [ES6 features](https://babeljs.io/docs/learn-es2015/) here.

### Images
* All **images** placed in `src/images/` folder will be automatically **optimized** and put in `build/images/` folder;
* To **clear** `build/images/` folder use `gulp imageClean` task.

### Vendor
* All **extensions** must be installed by the [Bower](http://bower.io/#install-packages);
* After installing the extension you must **include its files**:
  * **js files** must be included in `src/vendor_entries/vendor.js` by adding new elements to the **array**;
  * **css or sass files** must be included in `src/vendor_entries/vendor.scss` using `@import`.

### Production
* `gulp production` task creates the `production/` folder in the root of the project with **build files only**;
* It will **help you** to **create clear** instances of code for the **production** or **further implementation**.