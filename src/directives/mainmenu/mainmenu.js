angular.module('booklya.directives')
  .directive('bkMainmenu', [ '$state', 'apiConfig', '$rootScope', 'ipCookie', function($state, apiConfig, $rootScope, ipCookie) {
    
    return {
      templateUrl: '/views/mainmenu.html',
      restrict:'E',
      scope: {
        collapsed: '=',
        shadow: '='
      },
      link: function(scope, element, attrs) {

        scope.$state = $state;
        scope.baseUrl = apiConfig.baseUrl;
        scope.userMenuOpened = false;

        scope.onToggleUserMenu = function() {
          scope.userMenuOpened = !scope.userMenuOpened;
        };

        scope.onLogout = function() {
          $rootScope.userInfo = null;
          ipCookie.remove('sessionID');
        };

        element.children('.navbar-toggle').bind('click', function() {
          scope.collapsed = !scope.collapsed;
          scope.$apply();
        });
      }
    }
  
  }]);