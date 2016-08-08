angular.module('booklya.directives')
  .directive('bkAboutmenu', function() {
    
    return {
      templateUrl: '/views/aboutmenu.html',
      scope: {
        collapsed: '=',
        opened: '='
      },
      restrict:'E',
      link: function(scope, element, attrs) {

        scope.closeAbout = function() {
          scope.$parent.$parent.aboutOpened = false;
        }

      }
    };
  
  });