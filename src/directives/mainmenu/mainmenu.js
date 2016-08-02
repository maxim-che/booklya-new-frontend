angular.module('booklya.directives')
  .directive('bkMainmenu', [ '$state', function($state) {
    
    return {
      templateUrl: '/views/mainmenu.html',
      restrict:'E',
      scope: {
        collapsed: '=',
        shadow: '='
      },
      link: function(scope, element, attrs) {

        scope.$state = $state;

        element.children('.navbar-toggle').bind('click', function() {
          scope.collapsed = !scope.collapsed;
          scope.$apply();
        });
      }
    }
  
  }]);