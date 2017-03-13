## SCSS

* All custom **scss** files locate in `src/scss/` folder;
* Entry point for all scss is `src/scss/style.scss` you can **import** all your *.scss* files from here;
* You **don't need** to write **prefixes** for different browsers like `-webkit` it will be done by the gulp.

The `src` directory above contains MDL's Sass files and the JavaScript sources for all MDL components.

* All **extensions** must be installed by the [NPM](https://docs.npmjs.com/cli/install);
* After installing the extension you must **include its files**:
  * **css or sass files** must be included in `src/vendor_entries/vendor.scss` using `@import`.