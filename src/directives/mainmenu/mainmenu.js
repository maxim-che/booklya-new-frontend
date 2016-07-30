angular.module('booklya.directives', [])
  .directive('bMainmenu', function() {
    
    return {
      templateUrl: '/views/mainmenu.html',
      scope: {
        collapsed: '='
      },
      link: function(scope, element, attrs) {

        element.children('.navbar-toggle').bind('click', function() {
          scope.collapsed = !scope.collapsed;
          scope.$apply();
        });
      }
    }
  
  });