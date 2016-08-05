'use strict';

moment.locale('ru');

angular.module('booklya', [
  'ipCookie',
  'ui.router',
  'ui.calendar',
  'ui.bootstrap',
  'booklya.services',
  'booklya.directives',
  'angular-carousel'
]);