## Your folder structure for WSK:
	
If you want to use our WSK , you need to know something about the structure.

	
```
├── src
├── tasks
├── LICENSE
├── README.md
├── gulpfile.js
├── index.html
└── package.json

```

`Tasks` - folder for gulpfile tasks.
In `package.json` you can find all the dependencies.
In `src` folder you can find all sources for the project (images, sass , javascript files).

## `src` folder structure

```
├── images
├── js
   ├── modules
   ├── app.js
├── scss
   ├── base
      ├── _forms.scss
      ├── _functions.scss
      ├── _helpers.scss
      ├── _main.scss
      ├── _mixins.scss
      ├── _reset.scss
      ├── _typography.scss
      ├── _variables.scss
   ├── components
   ├── style.scss
├── vendor_entries
	├── vendor.js
	├── vendor.scss
├── gulpfile.js
├── index.html
└── package.json

```

Use `images` folder to add your graphic files, `modules` to add your javascript modules (don't forget to include it in app.js), `scss` folder to add your styles for the project. You can create, delete files and folders in `scss`, but don't forget to include them in `style.scss` file .

Use `vendor_entries` to include plugins into your project.


