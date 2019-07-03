[![Web Starter Kit](https://cloud.githubusercontent.com/assets/25930200/23856381/20707b74-0802-11e7-8578-5e4e91bb463e.png)](https://github.com/justcoded/web-starter-kit/releases)

>  A modern Web starter kit for projects

![node](http://img.shields.io/badge/node-6.13.x-blue.svg) ![npm](https://img.shields.io/badge/npm-4.2.x-blue.svg)  [![release](https://img.shields.io/github/release/justcoded/web-starter-kit.svg)](/releases) ![SCSS](http://img.shields.io/badge/SCSS-3.x.x-c6538c.svg) [![travis](https://img.shields.io/travis/justcoded/web-starter-kit.svg)](https://travis-ci.org) [![license](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![license](http://img.shields.io/badge/autoprefixer-included-blue.svg)](https://www.npmjs.com/package/autoprefixer) [![readme](http://img.shields.io/badge/readme-md-blue.svg)](/README.md) [![requests](http://img.shields.io/badge/PRs-welcome-green.svg)](/pulls)


## Overview

Web Starter Kit is an opinionated boilerplate for web development. Tools for building a great experience across many devices. A solid starting point for both professionals and newcomers to the industry.

## Table of Contents
1. [Browser Support](#browser-support)
2. [Features](#features)
3. [Install](#install)
4. [Quickstart](#quickstart)
5. [Commands](#commands)
6. [Structure](#structure)
7. [JS](#js)
8. [SCSS](#scss)
9. [Tasks](#tasks)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [License](#license)


## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

* Chrome
* Edge
* Firefox
* Safari
* Internet Explorer

This is not to say that Web Starter Kit cannot be used in browsers older than those reflected, but merely that our focus will be on ensuring our layouts work great in the above.


## Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Easy start |  We don't use responsive boilerplate. You are free to make your own decision in what way to make responsive for the site. Just start with `index.html`.                          |
| Sass support                           | Compile [Sass](http://sass-lang.com/) into CSS with ease, bringing support for variables, mixins and more (Run `gulp` for project compiling). In our WSK we follow Sass [guidelines](https://sass-guidelin.es/#architecture).                                                                                                      |
| Performance optimization               | Minify and concatenate JavaScript, CSS, HTML and images to help keep your pages lean (Run `gulp` to create an optimised version of your project to `/assets`).                                                                                                |
| Code Linting               | JavaScript code linting is done using [esLint](https://www.npmjs.com/package/gulp-eslint) - a linter tool for identifying and reporting on patterns in JavaScript (used airbnb-base rules https://www.npmjs.com/package/eslint-config-airbnb-base). HTML code hinting is done using [HtmlHint](https://www.npmjs.com/package/gulp-htmlhint).                                                                                             |
| ES2015(ES6) Support                   | Optional ES2015 support .You can use all kind of ES6 features here. ES2015 source code will be automatically transpiled to ES5 for wide browser support.  |
| HTML templating                       | Used [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) for templating html files. |
| Built-in HTTP Server                   | A built-in server for previewing your site locally while you develop and iterate.                                                                                                                                                                            |
| Live Browser Reloading                 | Reload the browser in real-time anytime an edit is made without the need for an extension (Run `gulp` and edit your files).                                                                                                                           |
| Cross-device Synchronization           | Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by [BrowserSync](http://browsersync.io) (Run `gulp` and open up the IP provided on other devices on your network).                       |
                                                                                                                                     
## Quickstart

Init your project using [jcn](https://github.com/justcoded/npm-jcn) or  [Download](https://github.com/justcoded/web-starter-kit/releases/latest) the kit from this repository and build on what is included in the `assets` directory.

You can start from `index.html` - the default starting point, with template text.

Be sure to look over the [installation](#install) to verify your environment is prepared to run Web Starter Kit.
Once you have verified that your system can run WSK, check out the [commands](#commands) available to get started.


## Install

Init your project using [jcn](https://github.com/justcoded/npm-jcn) or directly [Download WSK](https://github.com/justcoded/web-starter-kit/releases/latest) and run `$ npm install --global gulp@next && npm install` in that directory to get started.


To take advantage of Web Starter Kit you need to:

1. Download the code.
2. Install all necessary dependencies if you don't already have them.
3. Modify the application as you wish.
4. Make the production of your code.

This starter wasn't tested on Linux. If you want to use it on Ubuntu 17 type these commands in a command terminal:
```sh
$ sudo snap install node --classic --channel 6/stable
```
```sh
$ npm install gulpjs/gulp-cli -g
```


## Getting the code

[Download](https://github.com/justcoded/web-starter-kit/releases/latest) and extract WSK to the place where you want to work.

## Prerequisites

### [Node.js](https://nodejs.org)

Bring up a terminal and type `node --version`.
Node should respond with a version at or above 6.0.x.
If you need to install Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 4.0.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

*This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges.*


### Local dependencies

Next, install the local dependencies Web Starter Kit requires:

```sh
$ npm install
```

That's it! You should now have everything needed to use the Web Starter Kit.


You may also want to get used to some of the [commands](#commands) available.



## Commands

There are many commands available to help you build and test sites. Here are a few highlights to get started with.

### Watch For Changes & Automatically Refresh Across Devices

## Build & Optimize

```sh
$ gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.
Also, a [browsersync](https://browsersync.io/) script will be automatically generated, which will take care of precaching your sites' resources.


```sh
$ gulp dev
```

Same as 'gulp' command but without starting the local server.


## Serve the Fully Built & Optimized Site

```sh
$ gulp production
```

`gulp production` task creates the `production/` folder in the root of the project with **assets files only**. It will **help you** to **create clear** instances of code for the **production** or **further implementation**.


## Structure

Your folder structure for WSK:
If you want to use our WSK , you need to know something about the structure.

```
├── assets          #Folder with files after compiling
├── src             #Folder with sources
├── tasks           #Folder with tasks for gulpfile
├── LICENSE
├── README.md
├── gulp-config.js  #Config for gulp
├── gulpfile.js     #File with gulp tasks
├── index.html      #Main application
└── package.json    #File with dependencies

```

`Tasks` - folder for gulpfile tasks.
In `package.json` you can find all the dependencies.
In `src` folder you can find all sources for the project (images, sass , javascript files).

## `src` folder structure

```
├── html
   ├── partials                 #Folder for html components, that we can include into the templates 
   ├── templates                #Folder for source html templates of pages
├── images                      #Folder for storing images
├── js                          #Folder for storing js files
   ├── modules                  #Folder for storing js modules
   ├── app.js                   #Main js file
├── scss
   ├── abstracts                #Folder for storing scss files
      ├── _functions.scss       #Sass functions
      ├── _helpers.scss         #Sass helpers
      ├── _mixins.scss          #Sass mixins
      ├── _variables.scss       #Sass variables that we can use in our scss files
   ├── base                     #Folder for storing base styles
      ├── _forms.scss           #Sass styles for forms      
      ├── _main.scss            #Main scss file for base styles      
      ├── _reset.scss           #Sass reset
      ├── _typography.scss      #Sass styles for text      
   ├── components               #Global Reusable Presentational Components
   ├── layout                   #Global layout
   ├── pages                    #Global styles for pages
   ├── style.scss               #Main scss file (can be used for importing another files)
#This `templates` folder will be created if you choose a Pug option using jcn
├── templates                   #Folder with pug templates
   ├── layouts                  #Folder with pug layouts
      ├── default.pug           #Example of the pug layout
   ├── mixins                   #Folder with pug mixins
      ├── article.pug           #Example of the pug mixin
   ├── views                    #Folder with pug pages
      ├── blog.pug              #Example of a blog page
      ├── index.pug             #Example of a index page
├── vendor_entries              #Folder for vendor entries(plugins)
  ├── vendor.js                 #File for plugins js 
  ├── vendor.scss               #File for plugins styles

```

Use `images` folder to add your graphic files, `modules` to add your javascript modules (don't forget to include it in app.js), `scss` folder to add your styles for the project. You can create, delete files and folders in `scss`, but don't forget to include them in `style.scss` file .

Use `vendor_entries` to include plugins into your project.

## JS

 In our WSK you can use ES2015(ES6). ES2015 isn't introducing anything other than improvements to the JavaScript language and a few new features. 

 It is not an alternative syntax or language like CoffeeScript or TypeScript. It's good ol' fashioned JavaScript. The reason so many people are excited is that this version introduces a lot of much-needed improvements to the language. 

* All custom **javascript** files are located in `js/` folder;
* Entry point for javascript is `src/js/app.js` you can **import** all your *.js* files from here using [ES6 import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) feature;
* All javascript is **babelified** so yes! You can use all kind of [ES6 features](https://babeljs.io/docs/learn-es2015/) here.
* All **extensions** must be installed by the [NPM](https://docs.npmjs.com/cli/install);
* After installing the extension you must **include its files**:
  * **js files** must be included in `src/vendor_entries/vendor.js` by adding new elements to the **array**.



## SCSS

In our WSK you can use [SASS](http://sass-lang.com/). Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

Sass is a CSS preprocessor — a layer between the stylesheets you author and the .css files you serve to the browser. Sass (short for Syntactically Awesome Stylesheets) plugs the holes in CSS as a language, allowing you to write DRY code that’ll be faster, more efficient, and easier to maintain. In our WSK we follow Sass [guidelines](https://sass-guidelin.es/#architecture).

So while normal CSS doesn’t yet allow things like variables, mixins (reusable blocks of styles), and other goodies, Sass provides a syntax that does all of that and more—enabling “super functionality” in addition to your normal CSS.  

* All custom **scss** files locate in `src/scss/` folder;
* Entry point for all scss is `src/scss/style.scss` you can **import** all your *.scss* files from here;
* You **don't need** to write **prefixes** for different browsers like `-webkit` it will be done by the gulp.

The `src` directory above contains MDL's Sass files and the JavaScript sources for all MDL components.

* All **extensions** must be installed by the [NPM](https://docs.npmjs.com/cli/install);
* After installing the extension you must **include its files**:
  * **css or sass files** must be included in `src/vendor_entries/vendor.scss` using `@import`.
  
You are able to add your own custom sass files and optionally [disable/enable gulp-group-css-media-queries module](https://github.com/justcoded/web-starter-kit/issues/56).
You can see this property in the gulp-config.js file:

![image](https://user-images.githubusercontent.com/14921077/36471272-8ce84fbc-16f6-11e8-8173-4e41d1dbbb9f.png)

Please don't forget to link all your custom scss files in html:

![image](https://user-images.githubusercontent.com/14921077/36471279-9387a368-16f6-11e8-9814-a7f1a18150fc.png)

Also, you might want to add these sass files to the ignore list (check `getPathesToCopyForProduction` and `getPathesToCopy` properties in the `gulp-config.js` file). By default they will be copied to the assets and production folders.

## Tasks

|Task                               | Description                                                                                                                                                                                                                                               |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| browser-sync-server | Browsersync can watch your files as you work. Changes you make will either be injected into the page (CSS & images) or will cause all browsers to do a full-page refresh.                      |
| build-custom-js                         | Compiles all custom js from `src/js`.                                                                                                      |
| build-js-vendors               | minifies and сompiles all vendor js from `src/vendor_entries`.                                                                                                |
| build-sass-production               | Compiles and minifies all custom scss from `src/scss` to `production`   folder.                                                                                               |
| build-sass                   | Compiles all custom scss from `src/scss` to `assets/css`   folder.  |
| build-styles-vendors                 | Compiles and minifies all plugins  scss from `src/vendor_entries` to `production`   folder.                                                                                                                                                                            |
| clean-production                | `production` folder removing.                                                                                                                           |
| copy-folders           | Need to copy all folders from sources to assets.                       |
| file-include           | Compiles all html templates into html files.                       |
| templates           | Compiles all pug files into html files.                       |
| html-hint           | Need to hint html files.                    |
| es-lint           | Need to lint js files.                      |
| image-clean           | Removing images.                    |
| image-min           | We use this to minify images.                    |
| watch           | Task for watching all the changes.                   |
| compile-sass-files           | Compiles all custom scss files listed in the `gulp-config.js` to `assets/css`   folder                   |

## Troubleshooting

If you find yourself running into issues during installation or running the tools, please check our [Troubleshooting](https://github.com/justcoded/web-starter-kit/wiki/Troubleshooting) guide and then open an [issue](https://github.com/justcoded/web-starter-kit/issues). We would be happy to discuss how they can be solved.


## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions to Web Starter Kit, please see our [Contribution guide](CONTRIBUTING.md) before submitting a pull request. [Website](https://github.com/justcoded/web-starter-kit) related issues should be filed on the [Web Fundamentals](https://github.com/justcoded/web-starter-kit/issues) issue tracker.

## License

The MIT License (MIT).

Copyright (c) 2018 JustCoded the IP provided on other devices on your network.
                                                                                                                                     
