# NgPhotoLib

This package contains an angular directive for displaying photos, and two pre-made components that make use of that directive to display photos.

PhotoDirective:

Take a PhotoModel or string as input example:

```
<div libPhoto='http://myphotourl'>

<!--  OR -->

<div [libPhoto]='{ url: "http://myphotourl", focusPosition: { x: 50, y: 50 }>

```

x & y: numbers between 0 - 100, a point represented as a percentage of the way down the width or height of the image


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
