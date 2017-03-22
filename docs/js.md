## JS

 In our WSK you can use ES2015(ES6). ES2015 isn't introducing anything other than improvements to the JavaScript language and a few new features. 

 It is not an alternative syntax or language like CoffeeScript or TypeScript. It's good ol' fashioned JavaScript. The reason so many people are excited is that this version introduces a lot of much-needed improvements to the language. 

* All custom **javascript** files locate in `js/` folder;
* Entry point for javascript is `src/js/app.js` you can **import** all you *.js* files from here using [ES6 import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) feature;
* All javascript is **babelified** so yes! You can use all kind of [ES6 features](https://babeljs.io/docs/learn-es2015/) here.
* All **extensions** must be installed by the [NPM](https://docs.npmjs.com/cli/install);
* After installing the extension you must **include its files**:
  * **js files** must be included in `src/vendor_entries/vendor.js` by adding new elements to the **array**;





