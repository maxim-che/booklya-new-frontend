angular
  .module('booklya')
  .run(['$rootScope', '$injector', '$state', '$stateParams',
    function ($rootScope, $injector, $state, $stateParams) {

      $rootScope._breadcrumbs = [];

  }])
  .config(['$provide', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($provide, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

      $locationProvider.html5Mode(true)
      $httpProvider.defaults.useXDomain = true;
      // $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $urlRouterProvider.otherwise("");

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: '/views/main.html',
          controller: 'MainCtrl'
        })
        .state('webinar', {
          url: '/webinar',
          templateUrl: '/views/webinars.html',
          controller: 'WebinarCtrl'
        })
        .state('webinar.category', {
          url: '/:alias',
          templateUrl: '/views/webinars-category.html',
          controller: 'WebinarCtrl'
        })
        .state('webinar_details', {
          url: '/webinar/:category/:alias',
          templateUrl: '/views/webinar-details.html',
          controller: 'WebinarDetailsCtrl'
        })
  }]);