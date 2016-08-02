angular.module('booklya.directives')
  .directive('bkSidebarMenu', [ 'apiConfig', function(apiConfig) {
    
    return {

      templateUrl: '/views/sidebarmenu.html',

      restrict:'E',

      scope: {
        items: '=',
        current: '='
      },

      link: function(scope, element, attrs) {

        scope.baseUrl = apiConfig.baseUrl;

        scope.onClick = function(current) {
          scope.current = current;
        }

      }

    };
  
  }]);