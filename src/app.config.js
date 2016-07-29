angular
  .module('booklya')
  .run(['$rootScope', '$injector', '$state', '$stateParams',
    function ($rootScope, $injector, $state, $stateParams) {

  }])
  .config(['$provide', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($provide, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

      $locationProvider.html5Mode(true)
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $urlRouterProvider.otherwise("");


  }]);