angular.module('booklya.directives')
  .directive('bkAboutmenu', function() {
    
    return {
      templateUrl: '/views/aboutmenu.html',
      scope: {
        collapsed: '='
      },
      restrict:'E',
      link: function(scope, element, attrs) {

      }
    };
  
  });