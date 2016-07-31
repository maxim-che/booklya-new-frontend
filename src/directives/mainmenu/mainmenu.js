angular.module('booklya.directives')
  .directive('bkMainmenu', function() {
    
    return {
      templateUrl: '/views/mainmenu.html',
      restrict:'E',
      scope: {
        collapsed: '=',
        shadow: '='
      },
      link: function(scope, element, attrs) {

        element.children('.navbar-toggle').bind('click', function() {
          scope.collapsed = !scope.collapsed;
          scope.$apply();
        });
      }
    }
  
  });