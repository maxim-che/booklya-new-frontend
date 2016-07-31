angular
  .module('booklya.directives')
  .directive('bkCategorymenu', function() {
    return {
      scope: {
        items: '=',
        baseUrl: '='
      },
      templateUrl: '/views/categorymenu.html',
      link: function(scope, element, attrs) {
        
      }
    }
  });
