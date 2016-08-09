'use strict';

moment.locale('ru');

angular.module('booklya', [
  'ngAnimate',
  'ipCookie',
  'ui.router',
  'ui.calendar',
  'ui.bootstrap',
  'textAngular',
  'ImageCropper',
  'booklya.services',
  'booklya.directives',
  'LocalStorageModule'
]);