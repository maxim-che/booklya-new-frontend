angular
  .module('booklya')
  .run(['$rootScope', '$injector', '$state', '$stateParams', 'ipCookie', 'Auth',
    function ($rootScope, $injector, $state, $stateParams,ipCookie, Auth) {

      $injector.get("$http").defaults.headers.Cookie = ipCookie();
      $rootScope._breadcrumbs = [];

      $rootScope.previousState = {
        name: 'main',
        params: {}
      }; 

      $rootScope.currentState; 
      $rootScope.userInfo;

      // Get user info if him has logged
      if('undefined' !== typeof ipCookie('sessionID')) {
        Auth.userInfo(ipCookie('sessionID'))
          .then(function(res) {
            $rootScope.userInfo = res.data;
          }, function(res) {

          });
      }

      // Inject sending sessionID cookie
      // $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {

      //   console.log(headersGetter(), data);
      //   if ('undefined' !== typeof data && 'undefined' !== typeof ipCookie('sessionID')) {
      //     data['sessionID'] = ipCookie('sessionID');
      //   }
      //   return data;
      // };

      // Saving previous state
      $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) { 
        var fromName = from.name;

        if(!fromName.length) {
          fromName = 'main';
        }
        
        $rootScope.previousState = {
          name: fromName,
          params: fromParams
        };
        $rootScope.currentState = {
          name: to.name,
          params: toParams
        }
      });
  }])
  .config(['$provide', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($provide, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

      $httpProvider.interceptors.push('httpCookieInterceptor');

      $locationProvider.html5Mode(true)
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = false;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $urlRouterProvider.otherwise("");

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: '/views/main.html',
          controller: 'IndexCtrl'
        })
        .state('signin', {
          url: '/signin',
          templateUrl: '/views/signin.html',
          controller: 'AuthCtrl'
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
        .state('expert', {
          url: '/expert',
          templateUrl: '/views/expert.html',
          controller: 'ExpertCtrl'
        })
        .state('expert.category', {
          url: '/:alias',
          templateUrl: '/views/expert-category.html',
          controller: 'ExpertCtrl'
        })
        .state('expert_details', {
          url: '/expert/:category/:id',
          templateUrl: '/views/profile-main.html',
          controller: 'ExpertDetailsCtrl'          
        })
        .state('expert_details.schedule', {
          url: '/schedule',
          templateUrl: '/views/expert-details-schedule.html',
          controller: 'ExpertDetailsCtrl'          
        })
        .state('expert_details.articles', {
          url: '/articles',
          templateUrl: '/views/profile-articles.html',
          controller: 'ExpertDetailsCtrl'          
        })
        .state('expert_details.feedbacks', {
          url: '/feedbacks',
          templateUrl: '/views/expert-details-feedbacks.html',
          controller: 'ExpertDetailsCtrl'          
        })
        .state('expert_details.certificates', {
          url: '/certificates',
          templateUrl: '/views/expert-details-certificates.html',
          controller: 'ExpertDetailsCtrl'          
        })

  }]);