'use strict';

moment.locale('ru');

angular.module('booklya', [
  'ngAnimate',
  'ipCookie',
  'ngTouch',
  'ui.router',
  'ui.calendar',
  'ui.bootstrap',
  'textAngular',
  'ImageCropper',
  'booklya.services',
  'booklya.directives',
  'LocalStorageModule'
]);